# Employee Management API

A RESTful Employee Management API built with **Node.js**, **Express.js**, **TypeScript**, and **PostgreSQL**. The project demonstrates CRUD operations, PostgreSQL database design, REST API development, and cloud deployment using **Neon** and **Render**.

---

## Live Demo

**Base URL**

```
https://postgresql-employee-management-api.onrender.com
```

---

## Features

* Employee Management CRUD Operations
* Department Management CRUD Operations
* Attendance Management CRUD Operations
* Payroll Management CRUD Operations
* PostgreSQL Relational Database
* TypeScript Support
* RESTful API Architecture
* Cloud Database using Neon
* Deployed on Render
* Modular Project Structure

---

## Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL
* Neon (Cloud PostgreSQL)

### Tools

* pg
* dotenv
* tsx
* Git
* GitHub
* Render
* Postman / Thunder Client

---

## Project Structure

```
employee-management-api
│
├── src
│   ├── config
│   │   └── db.ts
│   │
│   ├── controllers
│   │   ├── employee.controller.ts
│   │   ├── department.controller.ts
│   │   ├── attendance.controller.ts
│   │   └── payroll.controller.ts
│   │
│   ├── routes
│   │   ├── employee.routes.ts
│   │   ├── department.routes.ts
│   │   ├── attendance.routes.ts
│   │   └── payroll.routes.ts
│   │
│   ├── services
│   │   ├── employee.service.ts
│   │   ├── department.service.ts
│   │   ├── attendance.service.ts
│   │   └── payroll.service.ts
│   │
│   ├── types
│   │   ├── employee.types.ts
│   │   ├── department.types.ts
│   │   ├── attendance.types.ts
│   │   └── payroll.types.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

## Database Schema

### Departments

| Column          | Type                                     |
| --------------- | ---------------------------------------- |
| department_id   | GENERATED ALWAYS AS IDENTITY PRIMARY KEY |
| department_name | VARCHAR(100)                             |

### Employees

| Column        | Type                                     |
| ------------- | ---------------------------------------- |
| employee_id   | GENERATED ALWAYS AS IDENTITY PRIMARY KEY |
| first_name    | VARCHAR(50)                              |
| last_name     | VARCHAR(50)                              |
| email         | VARCHAR(100)                             |
| phone         | VARCHAR(15)                              |
| salary        | NUMERIC                                  |
| department_id | INTEGER (Foreign Key)                    |

### Attendance

| Column          | Type                                     |
| --------------- | ---------------------------------------- |
| attendance_id   | GENERATED ALWAYS AS IDENTITY PRIMARY KEY |
| employee_id     | INTEGER (Foreign Key)                    |
| attendance_date | DATE                                     |
| status          | VARCHAR(20)                              |

### Payroll

| Column       | Type                                     |
| ------------ | ---------------------------------------- |
| payroll_id   | GENERATED ALWAYS AS IDENTITY PRIMARY KEY |
| employee_id  | INTEGER (Foreign Key)                    |
| basic_salary | NUMERIC                                  |
| bonus        | NUMERIC                                  |
| deduction    | NUMERIC                                  |
| net_salary   | NUMERIC                                  |
| payment_date | DATE                                     |

---

## API Endpoints

### Employees

| Method | Endpoint              |
| ------ | --------------------- |
| GET    | /api/v1/employees     |
| GET    | /api/v1/employees/:id |
| POST   | /api/v1/employees     |
| PUT    | /api/v1/employees/:id |
| DELETE | /api/v1/employees/:id |

### Departments

| Method | Endpoint                |
| ------ | ----------------------- |
| GET    | /api/v1/departments     |
| GET    | /api/v1/departments/:id |
| POST   | /api/v1/departments     |
| PUT    | /api/v1/departments/:id |
| DELETE | /api/v1/departments/:id |

### Attendance

| Method | Endpoint               |
| ------ | ---------------------- |
| GET    | /api/v1/attendance     |
| GET    | /api/v1/attendance/:id |
| POST   | /api/v1/attendance     |
| PUT    | /api/v1/attendance/:id |
| DELETE | /api/v1/attendance/:id |

### Payroll

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | /api/v1/payroll     |
| GET    | /api/v1/payroll/:id |
| POST   | /api/v1/payroll     |
| PUT    | /api/v1/payroll/:id |
| DELETE | /api/v1/payroll/:id |

---

## Deployment

* Backend: Render
* Database: Neon PostgreSQL

---