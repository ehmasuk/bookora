# Bookora API

<div align="center">

[![Express.js](https://img.shields.io/badge/Express.js-4.22.1-black)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.19.3-green)](https://www.mongodb.com/)

RESTful API backend for the Bookora book writing platform. Built with Express.js, TypeScript, and MongoDB.

</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Development](#development)

## 🎯 Overview

The Bookora API is a robust RESTful backend service that powers the Bookora book writing platform. It provides endpoints for user authentication, book management, chapter organization, and section content management. The API supports both manual book creation and AI-assisted generation workflows.

## ✨ Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 📚 **Book Management** - Create, read, update, and delete books
- 📖 **Chapter Management** - Organize chapters within books
- 📝 **Section Management** - Manage sections within chapters
- 👤 **User Management** - User profiles and book associations
- 📊 **Swagger Documentation** - Interactive API documentation
- 🛡️ **Error Handling** - Comprehensive global error handling
- 📝 **Logging** - Structured logging with Pino
- 🔒 **Authorization** - Resource ownership validation
- 🧪 **Seed Data** - Development data seeding utilities

## 🛠️ Tech Stack

- **Runtime**: Node.js (>=20)
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: Zod schemas
- **API Documentation**: Swagger/OpenAPI
- **Logging**: Pino with pino-http and pino-roll
- **Development**: nodemon, tsx

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- MongoDB instance (local or cloud)
- pnpm (or npm/yarn)

### Installation

1. **Navigate to the API directory:**

   ```bash
   cd apps/api
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

   Or from the root:

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   Copy `example.env` to `.env`:

   ```bash
   cp example.env .env
   ```

   Fill in the required values (see [Environment Variables](#environment-variables)).

4. **Start the development server:**

   ```bash
   pnpm dev
   ```

   The API will be available at `http://localhost:8080`

   Or from the root:

   ```bash
   pnpm --filter api dev
   ```

## 📚 API Documentation

Interactive API documentation is available via Swagger UI:

- **Local Development**: `http://localhost:8080/api-docs`
- **Production**: `https://bookora.vercel.app/api/api-docs`

The API follows RESTful conventions and returns JSON responses with the following structure:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    /* response data */
  }
}
```

## 🔐 Environment Variables

Create a `.env` file in the `apps/api` directory with the following variables:

| Variable          | Description                               | Required |
| ----------------- | ----------------------------------------- | -------- |
| `MONGODB_URL`     | MongoDB connection string                 | Yes      |
| `JWT_SECRET`      | Secret key for JWT token signing          | Yes      |
| `DB_NAME`         | MongoDB database name                     | Yes      |
| `CLOUDINARY_NAME` | Cloudinary cloud name (for image uploads) | Optional |

Example `.env` file:

```env
MONGODB_URL=mongodb://localhost:27017
JWT_SECRET=your-secret-key-here
DB_NAME=bookora
CLOUDINARY_NAME=your-cloudinary-name
```

## 📁 Project Structure

```
api/
├── src/
│   ├── app.ts              # Express app configuration
│   ├── index.ts            # Entry point
│   ├── config/             # Configuration files
│   │   ├── env.ts          # Environment variables
│   │   ├── logger.ts       # Logger configuration
│   │   └── swagger.ts      # Swagger configuration
│   ├── controllers/        # Route controllers
│   │   ├── auth.ts
│   │   ├── book.ts
│   │   ├── chapter.ts
│   │   ├── section.ts
│   │   ├── user.ts
│   │   └── ...
│   ├── middlewares/        # Express middlewares
│   │   ├── isAuthenticated.ts
│   │   ├── isOwned.ts
│   │   └── globalErrorHandlers.ts
│   ├── models/             # Mongoose models
│   │   ├── user.ts
│   │   ├── book.ts
│   │   ├── chapter.ts
│   │   └── section.ts
│   ├── routes/             # Route definitions
│   ├── lib/                # Business logic
│   ├── utils/              # Utility functions
│   ├── zodSchemas/         # Zod validation schemas
│   └── types/              # TypeScript types
├── dist/                   # Compiled JavaScript (generated)
├── logs/                   # Log files
├── swagger.yaml            # OpenAPI specification
├── package.json
└── tsconfig.json
```

## 📜 Available Scripts

| Command            | Description                                        |
| ------------------ | -------------------------------------------------- |
| `pnpm dev`         | Start development server with hot reload (nodemon) |
| `pnpm build`       | Compile TypeScript to JavaScript                   |
| `pnpm start`       | Start production server                            |
| `pnpm check-types` | Type-check TypeScript without emitting files       |

## 🔌 API Endpoints

### Health

- `GET /api/health` - Health check endpoint

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ name, email, password }`
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`

### Users

- `GET /api/user/:id` - Get user by ID (authenticated)
- `GET /api/user/:id/book` - Get all books of a user (authenticated)

### Books

- `GET /api/book` - Get all public books
- `GET /api/book/:id` - Get book by ID
- `POST /api/book` - Create a new book (authenticated)
- `PUT /api/book/:id` - Update a book (authenticated, owner only)
- `DELETE /api/book/:id` - Delete a book (authenticated, owner only)

### Chapters

- `GET /api/chapter/:id` - Get chapter by ID
- `POST /api/chapter` - Create a new chapter (authenticated)
- `PUT /api/chapter/:id` - Update a chapter (authenticated, owner only)
- `DELETE /api/chapter/:id` - Delete a chapter (authenticated, owner only)

### Sections

- `GET /api/section/:id` - Get section by ID
- `POST /api/section` - Create a new section (authenticated)
- `PUT /api/section/:id` - Update a section (authenticated, owner only)
- `DELETE /api/section/:id` - Delete a section (authenticated, owner only)

### Seed (Development)

- `GET /api/seed/user/:number` - Seed users (development only)
- `GET /api/seed/book/:number` - Seed books (development only)

For detailed request/response schemas, see the [Swagger documentation](http://localhost:8080/api-docs) or `swagger.yaml`.

## 🗄️ Database Schema

### User

```typescript
{
  id: string
  email: string
  password: string (hashed)
  name: string
  bookIds: string[]
  status: 'blocked' | 'unverified' | 'verified'
  timestamp: Date
}
```

### Book

```typescript
{
  id: string
  title: string
  summary: string
  userId: string
  chapterIds: string[]
  cover?: string
  isPublic: boolean
  timestamp: Date
}
```

### Chapter

```typescript
{
  id: string
  title: string
  summary: string
  bookId: string
  sectionIds: string[]
  timestamp: Date
}
```

### Section

```typescript
{
  id: string;
  title: string;
  content: string;
  chapterId: string;
  timestamp: Date;
}
```

## 💻 Development

### Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

### Error Responses

The API uses a consistent error response format:

```json
{
  "code": 400,
  "message": "Error message here"
}
```

Common status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

### Adding New Endpoints

1. Create a controller in `src/controllers/`
2. Create/update route in `src/routes/`
3. Add validation schema in `src/zodSchemas/`
4. Update `swagger.yaml` for documentation
5. Add business logic in `src/lib/` if needed

### Logging

Logs are written to the `logs/` directory:

- `logs/info/` - Info level logs
- `logs/error/` - Error level logs

Logs are automatically rotated using `pino-roll`.

## 📝 License

Part of the Bookora monorepo. See root [LICENSE](../LICENSE) for details.
