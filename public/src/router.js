import Layout from "./layout.js";

const routes = {
  "/": () => import("./pages/home/home.js"),
  "/login": () => import("./pages/login/login.js"),
  "/register": () => import("./pages/register/register.js"),
  "/todos": () => import("./pages/todos/todos.js"),
};

export async function render() {
  const path = location.pathname;
  const loader = routes[path];
  let pageModule;

  if (loader) {
    pageModule = await loader();
  }

  const content = pageModule
    ? pageModule.default()
    : "<h1>404 - Page not found</h1>";
  document.getElementById("app").innerHTML = Layout(content);

  if (pageModule && pageModule.setupEvents) {
    pageModule.setupEvents();
  }
}
