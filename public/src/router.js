import Layout from "./layout.js";

const routes = {
  "/": () => import("./pages/home/index.js"),
  "/login": () => import("./pages/login/index.js"),
  "/register": () => import("./pages/register/index.js"),
  "/todos": () => import("./pages/todos/index.js"),
};

export async function render() {
  const path = location.pathname;
  const loader = routes[path];
  let pageModule;

  if (loader) {
    pageModule = await loader();
  }

  const content = pageModule?.default?.render
    ? pageModule.default.render()
    : "<h1>404 - Page not found</h1>";

  document.getElementById("app").innerHTML = Layout(content);

  if (pageModule?.default?.setupEvents) {
    pageModule.default.setupEvents();
  }
}
