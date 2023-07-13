import { useState } from "react";
import { loginUser } from "../api/auth";
import { signInErrors } from "../validation";

const SignInForm = ({ onSignedIn }) => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const change = (event) => setValues({ ...values, [event.target.name]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    const found = signInErrors(values);
    setErrors(found);
    setMessage("");
    if (Object.keys(found).length > 0) return;
    setBusy(true);
    try {
      const { token } = await loginUser(values);
      if (onSignedIn) onSignedIn(token);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="signin-email">Email:</label>
      <input type="email" id="signin-email" name="email" value={values.email} onChange={change} />
      {errors.email && <p className="form-error">{errors.email}</p>}
      <label htmlFor="signin-password">Password:</label>
      <input
        type="password"
        id="signin-password"
        name="password"
        value={values.password}
        onChange={change}
      />
      {errors.password && <p className="form-error">{errors.password}</p>}
      {message && <p className="form-error" role="alert">{message}</p>}
      <button type="submit" disabled={busy}>{busy ? "Signing in..." : "Login"}</button>
    </form>
  );
};

export default SignInForm;
