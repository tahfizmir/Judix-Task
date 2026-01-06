# Judix assignment

A modern task management application built with React, Redux, Node.js, and MongoDB. Create, manage, and track your tasks with real-time statistics.

**[Live Demo](https://judix-task-omega.vercel.app/)**

---

## Features

-User Authentication** - Secure signup and login
-Task Management** - Create, edit, delete tasks
-Real-time Stats** - Live task counters
-Smart Filtering** - Filter by status and priority
-Responsive Design** - Works on all devices
-Production Ready** - Deployed on Vercel & Render

---

## Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React 18 | Node.js | MongoDB |
| Vite | Express | Mongoose |
| Redux | JWT Auth | Atlas |
| TailwindCSS | bcryptjs | |

---

## Quick Start (to run locally)


### Prerequisites
- Node.js 18+
- MongoDB ([Local](https://www.mongodb.com/try/download/community) or [Cloud](https://www.mongodb.com/cloud/atlas))

### 1. Clone & Install

```bash
git clone https://github.com/tahfizmir/Judix-Task.git
cd Judix-Task

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Setup Environment Variables

**`backend/.env`**
```bash
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/Judix
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
```

**`frontend/.env`**
```bash
VITE_API_BASE_URL=http://localhost:5000
```

### 3. Start Servers

```bash
# Terminal 1 - Backend
cd backend
npm run start
# http://localhost:5000

# Terminal 2 - Frontend
cd frontend
npm run dev
# http://localhost:5173
```

---

## How to Use

1. **Sign Up** - Create an account with email and password
2. **Login** - Access your dashboard
3. **Create Tasks** - Click "New Task" button
4. **Manage Tasks** - Edit, delete, or change status
5. **View Stats** - See real-time task statistics
6. **Filter** - Filter by status and priority
7. **Logout** - Click profile → Logout

---

## Project Structure

```
Judix Task/
├── frontend/          # React app
│   ├── src/
│   │   ├── pages/    # Login, Signup, Dashboard
│   │   ├── components/ # Task components
│   │   ├── store/    # Redux state
│   │   └── services/ # API calls
│   └── .env
│
└── backend/          # Express server
    ├── src/
    │   ├── routes/   # API endpoints
    │   ├── models/   # MongoDB schemas
    │   ├── middleware/ # Auth & validation
    │   └── server.js
    └── .env
```

---

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get profile

### Tasks
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get statistics

---

##  Deployment

### Frontend (Vercel)

```bash
1. Push to GitHub
2. Go to vercel.com
3. Import repository
4. Set root directory: frontend
5. Add env: VITE_API_BASE_URL=your_backend_url
6. Deploy
```

### Backend (Render)

```bash
1. Go to render.com
2. Create Web Service
3. Connect GitHub
4. Build: npm install
5. Start: npm run start
6. Add all .env variables
7. Deploy
```

### Database (MongoDB Atlas)

```bash
1. Sign up at mongodb.com/cloud/atlas
2. Create cluster
3. Create user
4. Get connection string
5. Add to backend .env
```



##  Author

**Tahfiz Mir**  
[GitHub](https://github.com/tahfizmir) | [Repository](https://github.com/tahfizmir/Judix-Task)


