import { signup } from "@/app/auth/action";

export default function SignUp() {
  return (
    /* Wrap in a form with the action prop */
    <form action={signup}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Sign Up</legend>

        <label className="label">Username</label>
        {/* Added 'name="username"' */}
        <input
          name="username"
          type="text"
          className="input w-full"
          placeholder="Username"
          required
        />

        <label className="label">Email</label>
        {/* Added 'name="email"' */}
        <input
          name="email"
          type="email"
          className="input w-full"
          placeholder="Email"
          required
        />

        <label className="label">Password</label>
        {/* Added 'name="password"' */}
        <input
          name="password"
          type="password"
          className="input w-full"
          placeholder="Password"
          required
        />

        <button type="submit" className="btn btn-neutral mt-4">
          Sign up
        </button>
      </fieldset>
    </form>
  );
}
