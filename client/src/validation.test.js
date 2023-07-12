import { isStrongPassword, isValidEmail, signInErrors, signUpErrors } from "./validation";

test("emails need an at sign and a dotted domain", () => {
  expect(isValidEmail("ada@example.com")).toBe(true);
  expect(isValidEmail(" ada@example.com ")).toBe(true);
  expect(isValidEmail("ada@example")).toBe(false);
  expect(isValidEmail("")).toBe(false);
  expect(isValidEmail(undefined)).toBe(false);
});

test("strong passwords have eight characters, a letter and a digit", () => {
  expect(isStrongPassword("harvest42")).toBe(true);
  expect(isStrongPassword("short1")).toBe(false);
  expect(isStrongPassword("lettersonly")).toBe(false);
  expect(isStrongPassword("12345678")).toBe(false);
});

test("sign in needs an email and a password", () => {
  expect(signInErrors({ email: "ada@example.com", password: "x" })).toEqual({});
  expect(Object.keys(signInErrors({ email: "no", password: "" }))).toEqual(["email", "password"]);
});

test("sign up reports every problem at once", () => {
  const errors = signUpErrors({ name: " ", email: "bad", password: "weak", confirmPassword: "other" });
  expect(Object.keys(errors)).toEqual(["name", "email", "password", "confirmPassword"]);
  expect(
    signUpErrors({ name: "Ada", email: "ada@example.com", password: "harvest42", confirmPassword: "harvest42" })
  ).toEqual({});
});
