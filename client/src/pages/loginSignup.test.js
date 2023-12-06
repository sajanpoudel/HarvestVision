import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginSignUp from "./loginSignup";

test("the page has a working sign in and sign up form", () => {
  render(
    <MemoryRouter>
      <LoginSignUp />
    </MemoryRouter>
  );
  expect(screen.getByRole("heading", { name: "Sign In" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Sign Up" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Signup" })).toBeInTheDocument();
});
