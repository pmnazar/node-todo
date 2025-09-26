# 📝 Todo App (Angular + Express + MongoDB + TypeScript)

This is a simple Todo App built with Angular on the frontend, Express with TypeScript for the backend, and MongoDB for data persistence.
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
- Backend written in TypeScript
- Code quality enforced with ESLint + TypeScript

---

## 🗂️ Project Structure

```
project/
├─ backend/
│  ├─ .env.example              # Example environment variables (JWT_SECRET, MONGO_URI, OPENAI_API_KEY, etc)
│  ├─ controllers/              # Controllers for handling route logic (.ts)
│  ├─ dockerfile                # Dockerfile for backend
│  ├─ middleware/               # JWT authentication and other middlewares (.ts)
│  ├─ models/                   # Mongoose schemas (User.ts, Todo.ts)
│  ├─ node_modules/             # Installed packages
│  ├─ package-lock.json
│  ├─ package.json              # Contains scripts: dev, build, start, test, test:watch
│  ├─ routes/                   # API routes (auth.ts, todos.ts)
│  ├─ server.ts                 # Main Express server
│  ├─ services/                 # Additional services (e.g., email, notifications) (.ts)
│  └─ tests/                    # Vitest + Supertest + MongoMemoryServer tests (.ts)
├─ frontend/
│  └─ todo/                     # Angular project (Angular CLI structure)
├─ tsconfig.json                 # TypeScript configuration for backend
├─ tsconfig.dev.json             # TypeScript config for development
├─ tsconfig.prod.json            # TypeScript config for production
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

Start backend server (TypeScript compilation + execution):

```bash
# Development mode with watch
npm run dev

# Compile TypeScript for production
npm run build

# Run server
npm start
```

### Frontend

```bash
cd frontend/todo
npm install
ng serve
```

- Frontend available at [http://localhost:4200](http://localhost:4200)
- Backend API available at [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Development Workflow

### Backend

```bash
cd backend
npm run dev  # Start in watch mode using tsx
```

### Frontend

```bash
cd frontend/todo
ng serve
```

---

## 🛠️ Usage

- User authentication with JWT
- Todos bound to the logged-in user
- CRUD operations for tasks (Create, Read, Update, Delete)
- Toggle todo completion status
- Frontend fetches tasks via API
- Code quality enforced with ESLint + TypeScript

---

## 🧪 Testing & Linting

### Backend

- Vitest for unit/integration testing
- Supertest for API endpoint testing
- MongoMemoryServer for in-memory MongoDB during tests

```bash
cd backend
npm run test        # Run all tests
npm run test:watch  # Watch mode
```

### Frontend

- Jest for unit testing Angular components and services
- @testing-library/angular for component testing
- ESLint for code quality

```bash
cd frontend/todo
npm test        # run Jest tests
npm run lint    # run ESLint on frontend code
```

---

## 💻 Tech Stack

- **Frontend:** Angular, TypeScript, HTML, CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB, Mongoose
- **Testing:** Vitest, Supertest, MongoMemoryServer, Jest, @testing-library/angular
- **Linting:** ESLint, TypeScript

---

## 🔗 Links

- MongoDB: [https://www.mongodb.com/](https://www.mongodb.com/)
- Angular: [https://angular.io/](https://angular.io/)
- Express: [https://expressjs.com/](https://expressjs.com/)
- **Live Demo:** [https://node-todo-frontend.onrender.com/](https://node-todo-frontend.onrender.com/)
