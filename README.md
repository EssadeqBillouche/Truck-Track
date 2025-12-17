# Route Tracking Application

A full-stack fleet and route management system for logistics companies, built with modern technologies.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Backend](#backend)
  - [Setup](#backend-setup)
  - [Environment Variables](#environment-variables)
  - [Scripts](#backend-scripts)
  - [API Endpoints](#api-endpoints)
  - [Architecture](#backend-architecture)
- [Frontend](#frontend)
  - [Setup](#frontend-setup)
  - [Scripts](#frontend-scripts)
  - [Pages & Components](#frontend-pages--components)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

This application allows companies to manage users (admins, drivers) and trucks, track routes, and handle authentication and authorization securely. It is built with a clean, scalable architecture using TypeScript for both backend and frontend.

---

## Features

### Backend

- **User Authentication:** Register, login, JWT-based sessions, password hashing with bcrypt.
- **Role-based Access:** Admin and driver roles, protected endpoints.
- **Truck Management:** CRUD operations for trucks.
- **Validation:** Zod schemas for DTO validation.
- **Error Handling:** Centralized error middleware, custom error classes.
- **Testing:** Jest for unit and integration tests.
- **Security:** Helmet, CORS, input validation, environment variables.
- **Modular Architecture:** Controller, Service, Repository, Model, Entity, DTO layers.

### Frontend

- **Authentication:** Login, registration, JWT storage, protected routes.
- **Dashboard:** Admin and driver dashboards.
- **Truck Management:** List, create, and view trucks.
- **State Management:** Redux Toolkit for global state.
- **Forms:** React Hook Form for robust form handling.
- **Styling:** Tailwind CSS for modern, responsive UI.
- **Routing:** React Router for SPA navigation.
- **PDF/Export:** Export reports with jsPDF and html2canvas.
- **Charts:** Data visualization with Chart.js.

---

## Tech Stack

- **Backend:** Node.js, Express, TypeScript, Mongoose, Zod, JWT, bcryptjs, Jest
- **Frontend:** React, TypeScript, Redux Toolkit, React Router, Axios, React Hook Form, Tailwind CSS, Vite
- **Database:** MongoDB

---

## Project Structure

```
/backend
  /src
    /config
    /controller
    /dto
    /entities
    /middlewares
    /model
    /repository
    /routes
    /service
    /helper
    app.ts
    server.ts
  package.json
  tsconfig.json
  .env

/frontend
  /src
    /assets
    /components
    /pages
    /store
    App.tsx
    main.tsx
    App.css
  package.json
  tsconfig.json
  vite.config.ts
  tailwind.config.js
  index.html
```

---

## Backend

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in `/backend`:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

3. **Run the backend in development:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

5. **Run tests:**
   ```bash
   npm test
   ```

### Environment Variables

- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — Secret for JWT signing
- `PORT` — Server port (default: 5000)

### Backend Scripts

- `npm run dev` — Start server with hot reload (tsx)
- `npm run build` — Compile TypeScript
- `npm start` — Run compiled server
- `npm test` — Run Jest tests

### API Endpoints

#### Auth

- `POST /api/auth/register` — Register a new user (admin/driver)
- `POST /api/auth/login` — Login and receive JWT

#### Trucks

- `POST /api/trucks` — Create a new truck (admin only)
- `GET /api/trucks` — List all trucks
- `GET /api/trucks/:id` — Get truck by ID

#### Users

- `GET /api/users` — List all users (admin only)
- `GET /api/users/:id` — Get user by ID

### Backend Architecture

- **Controller:** Handles HTTP requests, calls service methods, returns responses.
- **Service:** Business logic, validation, error handling, calls repository.
- **Repository:** Database access (Mongoose models).
- **Model:** Mongoose schemas.
- **Entity:** Domain objects with methods.
- **DTO:** Data Transfer Objects, Zod validation schemas.
- **Middlewares:** Auth, error handling, validation, etc.

---

## Frontend

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Run the frontend:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

### Frontend Scripts

- `npm run dev` — Start Vite dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

### Pages & Components

- **Auth Pages:** Login, Register
- **Dashboard:** Admin and driver dashboards
- **Truck Management:** Truck list, create truck, truck details
- **User Management:** (Admin) List and manage users
- **Shared Components:** Navbar, Sidebar, ProtectedRoute, etc.

---

## Testing

- **Backend:** Jest for unit and integration tests (`npm test` in `/backend`)
- **Frontend:** Add tests with your preferred React testing library

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## License

MIT

---

## Author

Essadeq Billouche

---

## Acknowledgements

- [Express](https://expressjs.com/)
- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Zod](https://zod.dev/)
