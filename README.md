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
- **Auto-refresh frontend on changes with LiveReload**

---

## 🗂️ Project Structure

```
project/
├─ server.js              # Main Express server with LiveReload
├─ routes/
│  └─ todos.js            # Todos API routes (GET, POST, PUT, DELETE)
├─ models/
│  └─ Todo.js             # Mongoose Todo schema
├─ public/                # Frontend files
│  ├─ index.html
│  ├─ main.js
│  └─ style.css
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

2. **Open the frontend in the browser**:

```
http://localhost:3000
```

3. **Automatic behavior**:

- Frontend changes (`index.html`, `main.js`, `style.css`) → **browser auto-refreshes**
- Backend changes (Express routes, server logic) → **server restarts** if using `nodemon`

4. **Optional: Use nodemon for backend + LiveReload for frontend**:

```bash
npx nodemon server.js
```

- This will restart the server on backend code changes while LiveReload handles frontend file refreshes.

> ⚡ Make sure to open the app using **localhost** in the browser (not `127.0.0.1`) so LiveReload WebSocket connects correctly.

---

## 🛠️ Usage

- Add a new todo using the input form.
- Edit a todo by clicking **Edit**, modify text, and click **Save**.
- Cancel edit mode using **Cancel** button.
- Delete a todo by clicking **Delete**.
- All changes are persisted in **MongoDB**.
- Frontend automatically reloads when you edit **HTML, JS, or CSS files**.

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
