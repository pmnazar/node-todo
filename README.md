# 📝 Todo App (Vanilla JS + Express + MongoDB)

This is a simple **Todo App** built with **Vanilla JavaScript** on the frontend, **Express** for the backend, and **MongoDB** for data persistence.
It's a **pet project** for learning, experimenting, and **interview practice**.

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
- Minimalistic UI with Vanilla JS
- Auto-refresh frontend on changes with LiveReload
- User authentication with JWT
- Todos are bound to the logged-in user

---

## 🗂️ Project Structure

```
project/
├─ server.js                 # Main Express server with LiveReload
├─ routes/
│  ├─ auth.js                # Auth API routes (register, login)
│  └─ todos.js               # Todos API routes (GET, POST, PUT, DELETE, toggle completion)
├─ middleware/
│  └─ auth.js                # JWT authentication middleware
├─ models/
│  ├─ User.js                # Mongoose User schema
│  └─ Todo.js                # Mongoose Todo schema
├─ tests/
│  └─ auth.test.js           # Auth route tests (Vitest + Supertest + MongoMemoryServer)
├─ public/                   # Frontend files
├─ .env                      # Environment variables (JWT_SECRET, MONGO_URI, PORT)
├─ .gitignore                # Files to ignore in Git
├─ .editorconfig             # Editor configuration for consistent coding style
├─ package.json
└─ README.md                 # Project documentation (this file)
```

This structure helps organize backend, frontend, tests, and configuration files clearly.

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/pmnazar/node-todo.git
cd node-todo
```

Install dependencies:

```bash
npm install
```

Start MongoDB locally (using `mongod` or Docker):

```bash
mongod --config /usr/local/etc/mongod.conf
# or with Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

---

## 🛠️ Development Workflow

Start the server with LiveReload:

```bash
node server.js
```

Create `.env` file:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Open the frontend in the browser:

```
http://localhost:3000
```

Automatic behavior:

- Frontend changes (`index.html`, `index.js`, `style.css`) → browser auto-refreshes
- Backend changes (Express routes, server logic) → server restarts if using `nodemon`

Optional: Use nodemon for backend + LiveReload for frontend:

```bash
npx nodemon server.js
```

> ⚡ Make sure to open the app using **localhost** in the browser (not `127.0.0.1`) so LiveReload WebSocket connects correctly.

---

## 🛠️ Usage

- User authentication with JWT
- Todos bound to the logged-in user
- CRUD operations for tasks (Create, Read, Update, Delete)
- Toggle todo completion status
- Delete todos via API
- Frontend fetches tasks via API
- Styled task list with edit/delete buttons
- LiveReload for frontend development

**Live demo:** [https://node-todo-jt90.onrender.com/](https://node-todo-jt90.onrender.com/)

---

## 🧪 Testing

- Tests written using **Vitest** for unit/integration testing
- **Supertest** for API endpoint testing
- **MongoMemoryServer** for an in-memory MongoDB instance during tests

Run tests:

```bash
npm test
```

---

## 💻 Tech Stack

- Frontend: Vanilla JavaScript, HTML, CSS
- Backend: Node.js, Express
- Database: MongoDB, Mongoose
- Tools: LiveReload for frontend auto-refresh, nodemon for backend restart
- Testing: Vitest, Supertest, MongoMemoryServer

---

## 📝 Notes

- This is a pet project for **learning purposes** and **interview preparation**.
- Demonstrates **CRUD operations**, **frontend-backend interaction**, **authentication**, and **minimalistic UI design**.
- LiveReload improves development workflow by auto-refreshing the browser on file changes.

---

## 🔗 Links

- MongoDB: [https://www.mongodb.com/](https://www.mongodb.com/)
- Express: [https://expressjs.com/](https://expressjs.com/)
- Live Demo: [https://node-todo-jt90.onrender.com/](https://node-todo-jt90.onrender.com/)
