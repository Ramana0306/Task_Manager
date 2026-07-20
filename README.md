# Task Manager

Full-stack task manager: Spring Boot REST API (JWT auth, PostgreSQL) + a proper React app
(Vite, not a CDN hack).

```
taskmanager-app/
├── backend/     Spring Boot API
└── frontend/    React app (Vite)
```

## Stack
- **Backend**: Java 17, Spring Boot 3.2.5, Spring Data JPA, Spring Security, Bean Validation, PostgreSQL, JWT (jjwt), Lombok
- **Frontend**: React 18 + Vite, plain `fetch`, no UI framework — just component-per-file

---

## 1. Backend setup

### Create the database
```sql
CREATE DATABASE taskmanager_db;
```

### Configure credentials
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/taskmanager_db
spring.datasource.username=postgres
spring.datasource.password=your_password
```
`spring.jpa.hibernate.ddl-auto=update` auto-creates the `users` and `tasks` tables on
first run.

### Run it
```bash
cd backend
mvn spring-boot:run
```
API starts on **http://localhost:8080**.

---

## 2. Frontend setup

```bash
cd frontend
npm install
npm run dev
```
Opens on **http://localhost:5173** and talks to `http://localhost:8080/api` by default
(configurable in `frontend/.env` via `VITE_API_BASE_URL`).

### Frontend structure
```
frontend/src/
├── main.jsx              # entry point
├── App.jsx                # holds auth state, switches between AuthForm / Dashboard
├── api.js                 # single fetch wrapper — every backend call goes through here
├── index.css               # global styles
└── components/
    ├── AuthForm.jsx        # login + register (one form, toggled)
    ├── Dashboard.jsx        # owns task state, wires TaskForm + TaskList together
    ├── TaskForm.jsx         # create/edit form
    ├── TaskList.jsx         # filter buttons + list rendering
    └── TaskItem.jsx         # single task card
```
Auth token + user info are kept in React state and persisted to `sessionStorage` so a
page refresh doesn't log you out (closing the tab does).

---

## API Reference

### Auth (public)
| Method | Endpoint | Body |
|---|---|---|
| POST | `/api/auth/register` | `{ "name", "email", "password" }` |
| POST | `/api/auth/login` | `{ "email", "password" }` |

Both return `{ token, type: "Bearer", userId, name, email }`.

### Tasks (require `Authorization: Bearer <token>`)
| Method | Endpoint | Notes |
|---|---|---|
| GET | `/api/tasks` | all tasks for the logged-in user |
| GET | `/api/tasks?status=PENDING` | filter by `PENDING` or `DONE` |
| GET | `/api/tasks/{id}` | 404 if it doesn't exist **or** belongs to someone else |
| POST | `/api/tasks` | `{ "title", "description", "dueDate", "status" }` (status optional, defaults to PENDING) |
| PUT | `/api/tasks/{id}` | same body as POST |
| DELETE | `/api/tasks/{id}` | 204 No Content |

### Example curl flow
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Ram","email":"ram@example.com","password":"secret123"}'

curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ram@example.com","password":"secret123"}'

TOKEN="paste-token-here"

curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Finish DSA sheet","description":"Sliding window set","dueDate":"2026-07-25","status":"PENDING"}'

curl "http://localhost:8080/api/tasks?status=PENDING" -H "Authorization: Bearer $TOKEN"
```

---

## Design notes (useful for interviews)
- **Password hashing**: `BCryptPasswordEncoder`, never store or return raw passwords.
- **JWT**: stateless — no server-side session, no refresh token. `JwtAuthFilter` runs once
  per request, reads the `Authorization` header, validates the token, and populates
  `SecurityContextHolder`.
- **Ownership enforcement**: `TaskRepository.findByIdAndUserId(id, userId)` instead of
  `findById` + a manual ownership check. A task that exists but belongs to another user
  returns **404**, not 403 — this avoids leaking whether a task ID exists at all to a
  user who doesn't own it.
- **DTOs everywhere**: entities never leave the service layer; `password` never appears
  in any response.
- **Validation**: `@Valid` + Bean Validation (`@NotBlank`, `@Email`, `@Size(min = 6)`),
  caught centrally by `GlobalExceptionHandler` and turned into a `400` with a
  `fieldErrors` map.
- **Global exception handling**: one `@RestControllerAdvice` maps exception types to
  HTTP status codes consistently (404 not found, 401 bad credentials, 400 validation,
  409 duplicate email, 500 fallback).

## Things intentionally left out (per spec)
- No role-based access control (single user role for everyone)
- No refresh tokens — token just expires (`jwt.expiration-ms`, default 24h) and the user
  logs in again
- No pagination on `GET /api/tasks`
