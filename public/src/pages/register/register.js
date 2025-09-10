import { BASE_URL } from "../../../config.js";
export default function RegisterPage() {
  return `
    <div id="auth-page">
      <h2>Register</h2>
      <form id="register-form">
        <input type="text" id="reg-username" placeholder="Username" required />
        <input
          type="password"
          id="reg-password"
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?
        <a href="/login" data-link id="show">Login here</a>
      </p>
    </div>
  `;
}

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
