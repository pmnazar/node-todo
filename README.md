# 📝 Todo App (Vanilla JS + Express + MongoDB)

This is a simple **Todo App** built with **Vanilla JavaScript** on the frontend, **Express** for the backend, and **MongoDB** for data persistence.
It's a **pet project** for learning, experimenting, and **interview practice**.

---

## 🚀 Features

- Add new todos
- List all todos
- Edit existing todos
- Cancel edit mode
- Delete todos
- Persist data with MongoDB
- Minimalistic UI with Vanilla JS
- Auto-refresh frontend on changes with LiveReload
- User authentication with JWT
- Todos are bound to the logged-in user

---

## 🗂️ Project Structure

```
project/
├─ server.js # Main Express server with LiveReload
├─ routes/
│ ├─ auth.js # Auth API routes (register, login)
│ └─ todos.js # Todos API routes (GET, POST, PUT, DELETE)
├─ middleware/
│ └─ auth.js # JWT authentication middleware
├─ models/
│ ├─ User.js # Mongoose User schema
│ └─ Todo.js # Mongoose Todo schema
├─ public/ # Frontend files
├─ .env # Environment variables (JWT_SECRET, MONGO_URI, PORT)
├─ package.json
└─ README.md
```

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/pmnazar/node-todo.git
cd node-todo
```

2. Install dependencies:

```bash
npm install
```

3. Start MongoDB locally (using `mongod` or Docker):

```bash
mongod --config /usr/local/etc/mongod.conf
# or with Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

---

## 🛠️ Development Workflow

1. **Start the server with LiveReload**:

```bash
node server.js
```

2. **Create .env file**:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

3. **Open the frontend in the browser**:

```
http://localhost:3000
```

4. **Automatic behavior**:

- Frontend changes (`index.html`, `index.js`, `style.css`) → **browser auto-refreshes**
- Backend changes (Express routes, server logic) → **server restarts** if using `nodemon`

5. **Optional: Use nodemon for backend + LiveReload for frontend**:

```bash
npx nodemon server.js
```

- This will restart the server on backend code changes while LiveReload handles frontend file refreshes.

> ⚡ Make sure to open the app using **localhost** in the browser (not `127.0.0.1`) so LiveReload WebSocket connects correctly.

---

## 🛠️ Usage

- User authentication with JWT
- Todos bound to logged-in user
- CRUD operations for tasks (Create, Read, Update, Delete)
- Frontend fetches tasks via API
- Styled task list with edit/delete buttons
- LiveReload for frontend development

---

## 💻 Tech Stack

- Frontend: Vanilla JavaScript, HTML, CSS
- Backend: Node.js, Express
- Database: MongoDB, Mongoose
- Tools: **LiveReload** for frontend auto-refresh, **nodemon** for backend restart

---

## 📝 Notes

- This is a pet project for **learning purposes** and **interview preparation**.
- Demonstrates **CRUD operations**, **frontend-backend interaction**, and **minimalistic UI design**.
- LiveReload improves development workflow by auto-refreshing the browser on file changes.

---

## 🔗 Links

- MongoDB: [https://www.mongodb.com/](https://www.mongodb.com/)
- Express: [https://expressjs.com/](https://expressjs.com/)
