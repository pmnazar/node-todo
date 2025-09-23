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
