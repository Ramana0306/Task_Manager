# Task Manager

A simple full-stack **Task Management application** built using **Spring Boot, React, and PostgreSQL**.

Users can register, log in, and manage their personal tasks securely using JWT authentication.

## 🚀 Features

* User Registration & Login
* JWT-based Authentication
* Create, Update & Delete Tasks
* Mark tasks as `PENDING` or `DONE`
* Filter tasks by status
* Add task description and due date
* Users can access only their own tasks
* Passwords securely hashed using BCrypt
* Input validation and global exception handling

## 🛠️ Tech Stack

**Backend**

* Java 17
* Spring Boot
* Spring Data JPA / Hibernate
* Spring Security
* JWT
* PostgreSQL
* Maven

**Frontend**

* React 18
* Vite
* JavaScript
* HTML/CSS
* Fetch API

## 🏗️ Project Structure

```text
taskmanager-app/
├── backend/       # Spring Boot REST API
└── frontend/      # React + Vite application
```

### Backend

```text
controller → service → repository → PostgreSQL
```

### Frontend

```text
React Components → REST API → Spring Boot
```

## 🔐 Authentication

The application uses **JWT authentication**.

```text
Login
  ↓
Spring Boot validates credentials
  ↓
JWT Token generated
  ↓
Frontend stores token
  ↓
Token sent with protected API requests
```

Passwords are stored using **BCrypt hashing** and are never returned through the API.

## 🌐 API Endpoints

### Authentication

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register user |
| POST   | `/api/auth/login`    | Login user    |

### Tasks

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | `/api/tasks`      | Get user's tasks |
| POST   | `/api/tasks`      | Create task      |
| PUT    | `/api/tasks/{id}` | Update task      |
| DELETE | `/api/tasks/{id}` | Delete task      |

## ▶️ How to Run


Web live at:

```text
http://13.48.6.97:3000
```

## 📚 What I Learned

Through this project, I practiced:

* Building REST APIs with Spring Boot
* JWT authentication and Spring Security
* CRUD operations using Spring Data JPA
* PostgreSQL database integration
* React component-based development
* Frontend-backend integration
* DTOs and request validation
* Global exception handling
* User-specific data access

## 🔮 Future Improvements

* Pagination
* Task search and sorting
* Task priority and categories
* Refresh token support
* Unit & integration testing
* Docker deployment
* Swagger/OpenAPI documentation

## 👨‍💻 About

This project was built as a practical **Java Full-Stack project** to strengthen my understanding of Spring Boot, REST APIs, databases, security, and React.
