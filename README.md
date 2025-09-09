# 📝 Todos App

Simple **Todo application** built with **Node.js, Express, MongoDB (Mongoose)** on the backend and **Vanilla JavaScript** on the frontend.  
This project is created as a **pet project** for interview preparation and to demonstrate skills in building a full-stack application.

---

## 🚀 Features

- Add new todos
- List all todos
- Edit existing todos
- Cancel edit mode
- Persist data with MongoDB
- Minimalistic UI with Vanilla JS

---

## 🛠️ Tech Stack

**Backend:**

- Node.js
- Express.js
- MongoDB
- Mongoose ODM

**Frontend:**

- HTML5
- CSS3
- Vanilla JavaScript (Fetch API)

---

## 📂 Project Structure

```
.
├── http-server/        # Express server files
├── mongose/            # Mongoose setup and backend logic
├── public/             # Frontend (HTML, CSS, JS)
│   ├── index.html
│   ├── main.js
│   └── style.css
└── README.md
```

---

## ⚙️ Installation & Running

### 1. Clone repository

```bash
git clone git@github.com:your-username/todos-app.git
cd todos-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start MongoDB

If you installed MongoDB locally:

```bash
mongod --config /usr/local/etc/mongod.conf
```

Or run with Docker:

```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### 4. Run backend

```bash
nodemon ./mongose/app.js
```

### 5. Open frontend

Just open `public/index.html` in your browser.

---

## 🔗 API Endpoints

### Get all todos

```
GET /todos
```

### Add new todo

```
POST /todos
Body: { "task": "Learn Node.js" }
```

### Update todo by id

```
PUT /todos/:id
Body: { "task": "Updated task text" }
```

---

## 🧑‍💻 Author

**Your Name**

- GitHub: [pmnazar](https://github.com/pmnazar)
- LinkedIn: [pmnazar](https://www.linkedin.com/in/pmnazar/)

---

## 📌 Notes

- Project is made for **educational and interview purposes**.
- Not production-ready but demonstrates **backend + frontend integration, CRUD, MongoDB usage, and clean code style**.
