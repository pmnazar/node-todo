# 📝 Todo App (Angular + Express + MongoDB)

This is a simple Todo App built with Angular on the frontend, Express for the backend, and MongoDB for data persistence.  
It's a pet project for learning, experimenting, and interview practice.

This README explains the project structure, setup instructions, usage, and testing.

---

## 🚀 Features

- Add new todos
- List all todos
- Edit existing todos
- Cancel edit mode
- Delete todos
- Toggle completion (mark todos as done)
- Persist data with MongoDB
- User authentication with JWT
- Todos are bound to the logged-in user
- Minimalistic UI with Angular

---

## 🗂️ Project Structure

```
project/
├─ backend/
│  ├─ server.js                 # Main Express server
│  ├─ routes/
│  │  ├─ auth.js                # Auth API routes (register, login)
│  │  └─ todos.js               # Todos API routes (CRUD, toggle completion)
│  ├─ middleware/
│  │  └─ auth.js                # JWT authentication middleware
│  ├─ models/
│  │  ├─ User.js                # Mongoose User schema
│  │  └─ Todo.js                # Mongoose Todo schema
│  ├─ tests/
│  │  └─ auth.test.js           # Auth route tests (Vitest + Supertest + MongoMemoryServer)
│  ├─ .env                      # Environment variables (JWT_SECRET, MONGO_URI, PORT)
│  └─ package.json
├─ frontend/
│  └─ todo/                     # Angular project (Angular CLI structure)
├─ .editorconfig                 # Editor configuration
├─ .gitignore
└─ README.md
```

---

## ⚙️ Installation

### Backend

```bash
cd backend
npm install
```

Start MongoDB locally (using mongod or Docker):

```bash
mongod --config /usr/local/etc/mongod.conf
# or with Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

### Frontend

```bash
cd frontend/todo
npm install
ng serve
```

---

## 🛠️ Development Workflow

### Backend

```bash
cd backend
# Start Express server
node server.js
# or with nodemon
npx nodemon server.js
```

### Frontend

```bash
cd frontend/todo
ng serve
```

- Frontend available at [http://localhost:4200](http://localhost:4200)
- Backend API available at [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Usage

- User authentication with JWT
- Todos bound to the logged-in user
- CRUD operations for tasks (Create, Read, Update, Delete)
- Toggle todo completion status
- Frontend fetches tasks via API

---

## 🧪 Testing

- Vitest for unit/integration testing (backend)
- Supertest for API endpoint testing
- MongoMemoryServer for in-memory MongoDB during tests

```bash
cd backend
npm test
```

---

## 💻 Tech Stack

- **Frontend:** Angular, TypeScript, HTML, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Testing:** Vitest, Supertest, MongoMemoryServer

---

## 🔗 Links

- MongoDB: [https://www.mongodb.com/](https://www.mongodb.com/)
- Angular: [https://angular.io/](https://angular.io/)
- Express: [https://expressjs.com/](https://expressjs.com/)
- **Live Demo:** [https://node-todo-frontend.onrender.com/](https://node-todo-frontend.onrender.com/)
