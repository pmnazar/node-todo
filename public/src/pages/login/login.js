import { BASE_URL } from "../../../config.js";
import { navigate } from "../../index.js";

export default function LoginPage() {
  return `
    <div id="auth-page">
        <h2>Login</h2>
        <form id="login-form">
            <input type="text" id="username" placeholder="Username" required />
            <input type="password" id="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
        <p>
            Don’t have an account?
            <a href="register" data-link id="show">Register here</a>
        </p>

    </div>
    `;
}

export function setupEvents() {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const url = `${BASE_URL}/api/auth/login`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(`❌ Login failed: ${data.message}`);
        return;
      }

      console.log("Login success, token:", data.token);

      // Optional: store token in localStorage
      localStorage.setItem("token", data.token);

      alert(`✅ Welcome, ${username}!`);
      navigate("todos");
    } catch (e) {
      console.error(e);
      alert("❌ Could not connect to server");
    }
  });
}
