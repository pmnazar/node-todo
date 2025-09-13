import { BASE_URL } from "../../../config.js";
import { navigate } from "../../index.js";

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
