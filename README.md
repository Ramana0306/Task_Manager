# Task Manager

A full-stack **Task Management Application** built using Java Spring Boot, React, and PostgreSQL. It allows users to register, log in, and manage their personal tasks securely using JWT authentication.

The application is deployed on AWS EC2 using Docker and Jenkins for automated CI/CD.

## 🚀 Features

- User Registration and Login
- JWT-based Authentication
- Create, Update, and Delete Tasks
- Mark tasks as `PENDING` or `DONE`
- Filter tasks by status
- Add task descriptions and due dates
- Users can access only their own tasks
- Password hashing using BCrypt
- Input validation and global exception handling

## 🛠️ Tech Stack

**Backend**
- Java
- Spring Boot
- Spring Data JPA / Hibernate
- Spring Security
- JWT Authentication
- PostgreSQL
- Maven

**Frontend**
- React
- Vite
- JavaScript
- HTML and CSS
- Fetch API

**DevOps & Deployment**
- Docker
- Docker Compose
- Jenkins
- AWS EC2
- Nginx
- Git and GitHub

## 🏗️ Project Structure

```text
Task_Manager/
├── backend/             # Spring Boot REST API
├── frontend/            # React + Vite application
├── docker-compose.yml   # Container configuration
└── Jenkinsfile          # CI/CD pipeline
```

### Application Architecture

```text
React Frontend
      |
      | REST API
      v
Spring Boot Backend
      |
      | Spring Data JPA
      v
PostgreSQL Database
```

## 🔐 Authentication

The application uses JWT-based authentication.

```text
User Login
    ↓
Spring Security validates credentials
    ↓
JWT Token Generated
    ↓
Frontend stores authentication data
    ↓
Token sent with protected API requests
    ↓
Backend validates the token
```

Passwords are securely hashed using BCrypt.

## 🌐 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get user's tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Delete task |

## ☁️ Deployment

The application is deployed on AWS EC2.

**Live Application:** http://54.252.222.187

- React frontend served through Nginx.
- Spring Boot backend runs inside a Docker container.
- PostgreSQL runs in a separate Docker container.
- Docker Compose manages the application services.

## ⚙️ CI/CD Pipeline

Jenkins is integrated with GitHub using webhooks to automate application builds and deployment.

### Workflow

```text
Developer Makes Code Changes
          ↓
Push Code to GitHub
          ↓
GitHub Webhook
          ↓
Jenkins Pipeline Triggered
          ↓
Checkout Source Code
          ↓
Build Spring Boot Backend
          ↓
Build Docker Images
          ↓
Deploy Using Docker Compose
          ↓
Updated Application Live on AWS EC2
```

### Jenkins Pipeline Stages

1. **Checkout Code:** Retrieves the latest source code from GitHub.
2. **Build Backend:** Builds the Spring Boot application using Maven.
3. **Build Docker Images:** Builds frontend and backend images.
4. **Deploy Application:** Updates and runs containers using Docker Compose.

## 📚 What I Learned

Through this project, I gained practical experience in:

- Developing REST APIs using Spring Boot.
- Implementing JWT authentication and Spring Security.
- Performing CRUD operations using Spring Data JPA.
- Integrating PostgreSQL with Spring Boot.
- Building frontend components using React.
- Connecting frontend and backend applications.
- Containerizing applications using Docker.
- Managing multiple services using Docker Compose.
- Automating builds and deployments using Jenkins.
- Deploying full-stack applications on AWS EC2.

## 🔮 Future Improvements

- Pagination and sorting
- Task search functionality
- Task priority and categories
- Unit and integration testing
- Swagger/OpenAPI documentation
- Refresh token support

## 👨‍💻 About

Task Manager is a student-level Java full-stack project developed to gain practical experience in backend development, frontend integration, database management, authentication, Docker, AWS deployment, and CI/CD automation.
