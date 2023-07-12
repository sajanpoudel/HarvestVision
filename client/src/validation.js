// The same rules as the server, so mistakes are shown before a request is made.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (value) => EMAIL.test((value || "").trim());

export const isStrongPassword = (value) =>
  typeof value === "string" && value.length >= 8 && /[A-Za-z]/.test(value) && /[0-9]/.test(value);

export function signInErrors({ email, password }) {
  const errors = {};
  if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Enter your password.";
  return errors;
}

export function signUpErrors({ name, email, password, confirmPassword }) {
  const errors = {};
  if (!(name || "").trim()) errors.name = "Enter your name.";
  if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!isStrongPassword(password)) {
    errors.password = "Use at least 8 characters with a letter and a digit.";
  }
  if (password !== confirmPassword) errors.confirmPassword = "The passwords do not match.";
  return errors;
}
