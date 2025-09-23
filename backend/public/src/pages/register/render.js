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
