import { BASE_URL } from "../../../config.js";

export function setupEvents() {
  const form = document.getElementById("register-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    try {
      const url = `${BASE_URL}/api/auth/register`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      alert(res.ok ? `✅ ${data.message}` : `❌ ${data.message}`);
    } catch (e) {
      console.error(e);
      alert("❌ Could not connect to server");
    }
  });
}
