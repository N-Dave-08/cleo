import { login } from "@/app/auth/action";

export default function Login() {
  return (
    <form action={login}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          className="input"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          className="input"
          placeholder="Password"
        />

        <button type="submit" className="btn btn-neutral mt-4">
          Login
        </button>
      </fieldset>
    </form>
  );
}
