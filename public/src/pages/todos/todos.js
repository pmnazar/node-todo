import { BASE_URL } from "../../../config.js";
import { navigate } from "../../index.js";
import getAuthHeaders from "../../../helpers/get-auth-headers.js";
import escapeHtml from "../../../helpers/escape-html.js";

export default function TodosPage() {
  return `
   <div id="todos-page">
      <h2>My Todos</h2>

      <form id="todo-form">
        <input type="text" id="task" placeholder="New task" required />
        <button type="submit">Add</button>
      </form>

      <ul id="todos-list"></ul>

      <button id="logout-btn">Logout</button>
    </div>
  `;
}

export function setupEvents() {
  const todoForm = document.getElementById("todo-form");
  const taskInput = document.getElementById("task");
  const logoutBtn = document.getElementById("logout-btn");
  const todosList = document.getElementById("todos-list");
  const url = `${BASE_URL}/api/todos`;

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    navigate("login");
  });

  async function fetchTodos() {
    try {
      const res = await fetch(url, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        todosList.innerHTML = "<li>Unable to fetch (not authenticated?)</li>";
        return;
      }

      const data = await res.json();

      todosList.innerHTML = data
        .map((t) => {
          return `
          <li class="todo-task" data-id="${t._id}">
            <span class="task-text">${escapeHtml(t.task)}</span>
            <div class="actions">
              <button class="edit-btn">Edit</button>
              <button class="delete-btn">Delete</button>
            </div>
          </li>
        `;
        })
        .join("");
    } catch (e) {
      console.error(e);
      alert("❌ Could not fetch todos");
    }
  }

  fetchTodos();

  todoForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const task = taskInput.value.trim();
    if (!task) return;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ task }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(`❌ Error: ${data.message}`);
        return;
      }
    } catch (e) {
      console.error(e);
      alert("❌ Could not add todo");
    }

    taskInput.value = "";
    fetchTodos();
  });
}
