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
