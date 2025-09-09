# 📝 Todo App (Vanilla JS + Express + MongoDB)

This is a simple **Todo App** built with **Vanilla JavaScript** on the frontend, **Express** for the backend, and **MongoDB** for data persistence.
It's a **pet project** for learning and **interview practice**.

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

---

## 🗂️ Project Structure

```
project/
├─ server.js              # Main Express server
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

4. Start the server with LiveReload:

```bash
node server.js
```

5. Open the frontend in the browser:

```
http://localhost:3000
```

---

## 🛠️ Usage

- Add a new todo using the input form.
- Edit a todo by clicking **Edit**, modify text, and click **Save**.
- Cancel edit mode using **Cancel** button.
- Delete a todo by clicking **Delete**.
- All changes are persisted in **MongoDB**.

---

## 💻 Tech Stack

- Frontend: Vanilla JavaScript, HTML, CSS
- Backend: Node.js, Express
- Database: MongoDB, Mongoose
- Tools: LiveReload for frontend auto-refresh

---

## 📝 Notes

- This is a pet project for **learning purposes** and **interview preparation**.
- The project demonstrates **CRUD operations**, **frontend-backend interaction**, and **minimalistic UI design**.

---

## 🔗 Links

- MongoDB: [https://www.mongodb.com/](https://www.mongodb.com/)
- Express: [https://expressjs.com/](https://expressjs.com/)
