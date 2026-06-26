# 📚 Library Management System

A RESTful Backend API for managing a Library Management System built using **Node.js**, **Express.js**, **PostgreSQL**, **Prisma ORM**, **JWT Authentication**, and **bcrypt**.

---

# Features

## Authentication

* Member Registration
* User Login
* JWT Authentication
* Password Hashing using bcrypt

## Librarian

* View Members
* Delete Member
* Add Book
* View Books
* View Book Details
* Update Book
* Delete Book

## Member

* View Books
* Borrow Book
* Return Book
* View Borrowed Books

---

# Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* JWT
* bcrypt
* dotenv

---

# Folder Structure

```
library-management-system

├── prisma
│   └── schema.prisma
│
├── src
│   ├── config
│   │   └── prisma.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   └── memberController.js
│   │
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   └── memberRoutes.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Go inside the project

```bash
cd library-management-system
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

DATABASE_URL="postgresql://postgres:password@localhost:5432/librarydb?schema=public"

JWT_SECRET=mysecretkey
```

---

# Database Setup

Create a PostgreSQL database named

```
librarydb
```

Run Prisma migration

```bash
npx prisma migrate dev --name init
```

Generate Prisma Client

```bash
npx prisma generate
```

(Optional)

Open Prisma Studio

```bash
npx prisma studio
```

---

# Running the Application

Development

```bash
npm run dev
```

Production

```bash
npm start
```

Server

```
http://localhost:5000
```

---

# Authentication APIs

## Register

**POST**

```
/api/auth/register
```

Request

```json
{
  "name": "John",
  "email": "john@gmail.com",
  "password": "password123",
  "role": "member"
}
```

---

## Login

**POST**

```
/api/auth/login
```

Request

```json
{
  "email": "john@gmail.com",
  "password": "password123"
}
```

Response

```json
{
  "success": true,
  "token": "JWT_TOKEN"
}
```

---

# Book APIs

## Add Book

**POST**

```
/api/books
```

Authorization

```
Bearer Token (LIBRARIAN)
```

---

## Get All Books

**GET**

```
/api/books
```

---

## Get Book By ID

**GET**

```
/api/books/:id
```

---

## Update Book

**PUT**

```
/api/books/:id
```

Authorization

```
Bearer Token (LIBRARIAN)
```

---

## Delete Book

**DELETE**

```
/api/books/:id
```

Authorization

```
Bearer Token (LIBRARIAN)
```

---

# Member APIs

## Get All Members

**GET**

```
/api/members
```

Authorization

```
Bearer Token (LIBRARIAN)
```

---

## Delete Member

**DELETE**

```
/api/members/:id
```

Authorization

```
Bearer Token (LIBRARIAN)
```

---

## Borrow Book

**POST**

```
/api/books/:id/borrow
```

Authorization

```
Bearer Token (MEMBER)
```

---

## Return Book

**POST**

```
/api/books/:id/return
```

Authorization

```
Bearer Token (MEMBER)
```

---

## My Borrowed Books

**GET**

```
/api/members/me/books
```

Authorization

```
Bearer Token (MEMBER)
```

---

# Validation

The application validates:

* Required Fields
* Email Format
* Password Length
* Duplicate Email
* Duplicate ISBN
* Invalid Book ID
* Invalid Member ID
* Negative Quantity
* Book Availability

---

# Authorization

## Librarian

Can

* Add Books
* Update Books
* Delete Books
* View Members
* Delete Members

Cannot

* Borrow Books
* Return Books

---

## Member

Can

* View Books
* Borrow Books
* Return Books
* View Borrowed Books

Cannot

* Add Books
* Delete Books
* Update Books
* Delete Members

---

# Sample Error Response

```json
{
    "success": false,
    "message": "Book is currently unavailable."
}
```

---

# HTTP Status Codes

| Code | Description           |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 500  | Internal Server Error |

---

# Future Improvements

* Pagination
* Search Books
* Filter Books by Category
* Refresh Token Authentication
* Swagger Documentation
* Unit Testing

---

# Author

Developed using Node.js, Express.js, PostgreSQL, Prisma ORM, JWT Authentication, and bcrypt.
