🧠 FocusTrack — Fullstack Productivity SaaS

FocusTrack is a fullstack productivity SaaS application built with Node.js, React, and Flutter.  
It supports secure JWT authentication, task management, habit streak tracking, analytics dashboards, and is deployed to production.

🔗 Live Demo: https://focus-tracker-uczm.vercel.app/  
🔗 Backend API: (https://focus-tracker-z05j.onrender.com)

---

## 📌 Overview

FocusTrack allows users to:

- Register and login securely using JWT authentication
- Create, update, and delete tasks
- Track habits with automatic streak calculation
- View real-time productivity analytics
- Access the system via Web (React) and Mobile (Flutter)

The project demonstrates fullstack architecture, secure authentication, multi-user data isolation, and production deployment.

---

## 🏗 Architecture

### 🔹 Backend (Node.js + Express)

Structured using layered architecture:

- JWT authentication middleware
- Protected routes
- Multi-user data isolation
- Habit streak computation logic
- Analytics aggregation endpoint
- Centralized error handling
- Environment-based configuration
- Production-ready CORS setup

### 🔹 Frontend (React + Vite + Tailwind)

Feature-based architecture:


- Auth Context (global state management)
- Protected routes
- Service layer abstraction (Axios)
- Recharts analytics visualization
- Tailwind CSS professional UI
- Environment-based API config

### 🔹 Mobile (Flutter)

- Connected to same production backend
- JWT-based authenticated requests
- Shared API architecture

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express
- MongoDB (Atlas)
- Mongoose
- JWT
- bcrypt
- CORS
- Render (Deployment)

### Frontend
- React (Vite)
- React Router
- Axios
- Tailwind CSS
- Recharts
- Vercel (Deployment)

### Mobile
- Flutter
- Provider
- HTTP package

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend verifies credentials
3. JWT token is generated
4. Token is stored client-side
5. All protected routes require `Authorization: Bearer <token>`
6. Middleware verifies token and attaches user to request

---

## 📊 Core Features

### ✅ Task Management
- Create, update, delete tasks
- Status toggle (pending/completed)
- User-specific data isolation

### ✅ Habit Tracking
- Daily/weekly habits
- Automatic streak tracking
- Last completion tracking

### ✅ Analytics Dashboard
- Total tasks
- Completed vs pending tasks
- Highest habit streak
- Computed productivity score
- Chart visualization

---

## 🌍 Deployment

- Backend deployed on **Render**
- Frontend deployed on **Vercel**
- MongoDB hosted on **MongoDB Atlas**
- Environment variables used for secure production configuration

---

## 📷 Screenshots

(https://drive.google.com/drive/folders/1g8f4iOr5mdqsg5Zx1VOsxnWRC1kUZ8zi?usp=drive_link)

- Login Page
- Dashboard
- Task Management UI
- Habit Tracker
- Analytics Chart

---

## 🧠 What I Learned

- Designed and implemented JWT-based authentication
- Built secure multi-user backend logic
- Implemented business logic (habit streak calculation)
- Designed analytics aggregation endpoints
- Structured scalable frontend architecture
- Deployed fullstack application to production
- Connected web and mobile clients to same API

---

## 🚀 Future Improvements

- Pagination & filtering
- Refresh token authentication
- Role-based access control
- Dark mode
- CI/CD pipeline
- Subscription-based features

---

## 👨🏽‍💻 Author

Adeyemi Favour  
Fullstack & Mobile Developer  
Flutter | React | Node.js

