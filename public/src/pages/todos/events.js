import { BASE_URL } from "../../../config.js";
import getAuthHeaders from "../../../helpers/get-auth-headers.js";
import { navigate } from "../../index.js";
import renderTodoItem from "./todo-item.js";

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
        navigate("login");
        todosList.innerHTML = "<li>Unable to fetch (not authenticated?)</li>";
        return;
      }

      const data = await res.json();

      todosList.innerHTML = "";
      data.forEach((todo) => {
        todosList.appendChild(
          renderTodoItem(
            todo,
            async (id, task, completed) => {
              const url = `${BASE_URL}/api/todos/${id}`;
              const res = await fetch(url, {
                method: "PUT",
                headers: getAuthHeaders(),
                body: JSON.stringify({ task, user: todo.user, completed }),
              });

              if (!res.ok) throw new Error("Failed to save");

              return await res.json();
            },
            async (id, task) => {
              const confirmed = confirm(
                `Are you sure you want to delete the task "${task}"?`
              );

              if (confirmed) {
                const url = `${BASE_URL}/api/todos/${id}`;
                const res = await fetch(url, {
                  method: "DELETE",
                  headers: getAuthHeaders(),
                });

                if (!res.ok) throw new Error("Falide to delete");
                fetchTodos();
              }
            }
          )
        );
      });
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
