const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task");
const todosList = document.getElementById("todo-list");
const baseURL = "http://localhost:3000";

function createSaveBtn(input, todo) {
  const saveBtn = document.createElement("span");
  saveBtn.textContent = "Save";
  saveBtn.style.cursor = "pointer";
  saveBtn.style.marginLeft = "10px";
  saveBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const newTask = input.value.trim();

    if (!newTask) return;

    await fetch(`${baseURL}/todos/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask }),
    });

    fetchTodos();
  });

  return saveBtn;
}

function createCancelBtn(li, todo, todos) {
  const cancelBtn = document.createElement("span");

  cancelBtn.textContent = "Cancel";
  cancelBtn.style.cursor = "pointer";
  cancelBtn.style.marginLeft = "10px";

  cancelBtn.addEventListener("click", () => {
    generateLiContent(li, todo, todos);
  });

  return cancelBtn;
}

function createEditBtn(li, todo, todos) {
  const editBtn = document.createElement("span");
  editBtn.textContent = "Edit";
  editBtn.style.marginLeft = "10px";
  editBtn.style.cursor = "pointer";
  editBtn.addEventListener("click", () => editTodo(li, todo, todos));

  return editBtn;
}

function generateLiContent(li, todo, todos) {
  li.innerHTML = "";

  const textNode = document.createTextNode(todo.task);
  const editBtn = createEditBtn(li, todo, todos);

  li.appendChild(textNode);
  li.appendChild(editBtn);

  return li;
}

async function fetchTodos() {
  try {
    const res = await fetch(`${baseURL}/todos`);

    const todos = await res.json();

    todosList.innerHTML = "";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.dataset.id = todo._id;
      generateLiContent(li, todo, todos);
      todosList.appendChild(li);
    });
  } catch (e) {
    console.error("Failed to fetch todos:", e);
    setTimeout(fetchTodos, 1000);
  }
}

// Add new todo
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const task = taskInput.value;
  if (!task) return;

  await fetch(`${baseURL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task }),
  });

  taskInput.value = "";
  fetchTodos();
});

function resetLis(li, todos) {
  Array.from(todosList.children).forEach((child) => {
    const id = li.dataset.id;

    if (child.dataset.id !== id) {
      const todo = todos.find((todo) => todo._id === child.dataset.id);
      generateLiContent(child, todo, todos);
    }
  });
}

function editTodo(li, todo, todos) {
  console.log("todos", todos);
  resetLis(li, todos);
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.task;

  li.innerHTML = "";

  const saveBtn = createSaveBtn(input, todo);
  const cancelBtn = createCancelBtn(li, todo, todos);

  li.appendChild(input);
  li.appendChild(saveBtn);
  li.appendChild(cancelBtn);
}

fetchTodos();
