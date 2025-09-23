export default function HomePage() {
  return `
    <h1>Welcome to Todos App!</h1>
    <p>Manage your tasks easily.</p>
    <div style="margin-top:20px;">
      <a href="/login" data-link>Login</a> |
      <a href="/register" data-link>Register</a>
    </div>
  `;
}
