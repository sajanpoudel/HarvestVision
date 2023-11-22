import { useState } from "react";
import { registerUser } from "../api/auth";
import { signUpErrors } from "../validation";

const empty = { name: "", email: "", password: "", confirmPassword: "" };

const SignUpForm = ({ onRegistered }) => {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const change = (event) => setValues({ ...values, [event.target.name]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    const found = signUpErrors(values);
    setErrors(found);
    setMessage("");
    setDone(false);
    if (Object.keys(found).length > 0) return;
    setBusy(true);
    try {
      await registerUser({ name: values.name, email: values.email, password: values.password });
      setDone(true);
      setValues(empty);
      if (onRegistered) onRegistered();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  };

  const field = (name, label, type) => (
    <>
      <label htmlFor={`signup-${name}`}>{label}</label>
      <input type={type} id={`signup-${name}`} name={name} value={values[name]} onChange={change} />
      {errors[name] && <p className="form-error">{errors[name]}</p>}
    </>
  );

  return (
    <form onSubmit={submit} noValidate>
      {field("name", "Name:", "text")}
      {field("email", "Email:", "email")}
      {field("password", "Password:", "password")}
      {field("confirmPassword", "Confirm Password:", "password")}
      {message && <p className="form-error" role="alert">{message}</p>}
      {done && <p className="form-success" role="status">Account created. You can sign in now.</p>}
      <button type="submit" disabled={busy}>{busy ? "Creating account..." : "Signup"}</button>
    </form>
  );
};

export default SignUpForm;
