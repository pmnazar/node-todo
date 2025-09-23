import { render } from "./router.js";

export function navigate(path) {
  history.pushState({}, "", path);
  render();
}

document.addEventListener("click", (e) => {
  if (e.target.matches("a[data-link]")) {
    e.preventDefault();
    navigate(e.target.getAttribute("href"));
  }
});

window.addEventListener("popstate", render);
window.addEventListener("load", render);
