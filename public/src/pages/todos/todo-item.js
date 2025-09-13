import escapeHtml from "../../../helpers/escape-html.js";
import { createBtn } from "./helpers.js";

export default function renderTodoItem(todo, onSave, onDeleted) {
  const li = document.createElement("li");

  li.className = "todo-task";
  li.dataset.id = todo._id;

  // label
  const label = document.createElement("span");
  label.className = "task-text";

  label.textContent = escapeHtml(todo.task);

  // actions
  const actions = document.createElement("div");
  actions.className = "actions";

  // Normal mode
  function renderNormalActions() {
    actions.innerHTML = "";

    const editBtn = createBtn("Edit", "btn edit", "click", (e) => {
      e.preventDefault();

      renderEditActions();
    });

    const deleteBtn = createBtn("Delete", "btn delete", "click", (e) => {
      e.preventDefault();

      onDeleted(todo._id, label.textContent);
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
  }

  function renderEditActions() {
    actions.innerHTML = "";

    // input
    const input = document.createElement("input");
    input.type = "text";
    input.value = todo.task;

    label.replaceWith(input);

    const saveBtn = createBtn("Save", "btn save", "click", async (e) => {
      e.preventDefault();
      await saveTask();
    });

    const cancelBtn = createBtn("Cancel", "btn cancel", "click", (e) => {
      e.preventDefault();

      input.replaceWith(label);
      renderNormalActions();
    });

    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);

    input.addEventListener("keydown", async (e) => {
      console.log("e.key", e.key);
      if (e.key === "Enter") {
        e.preventDefault();
        saveBtn.click();
      }

      if (e.key === "Escape") {
        e.preventDefault();
        cancelBtn.click();
      }
    });

    async function saveTask(e) {
      const newTask = input.value.trim();
      if (!newTask) return;

      try {
        const updated = await onSave(todo._id, input.value.trim());
        todo.task = updated.task;
        input.replaceWith(label);
        label.textContent = updated.task;
        renderNormalActions();
      } catch (e) {
        console.error(e);
        alert("❌ Could not save task");
      }
    }
  }

  li.appendChild(label);
  li.appendChild(actions);
  renderNormalActions();

  return li;
}
