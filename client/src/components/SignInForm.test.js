import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignInForm from "./SignInForm";
import * as auth from "../api/auth";

afterEach(() => jest.restoreAllMocks());

test("empty fields show the problems and send nothing", async () => {
  const login = jest.spyOn(auth, "loginUser");
  render(<SignInForm />);
  userEvent.click(screen.getByRole("button", { name: /login/i }));
  expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();
  expect(screen.getByText("Enter your password.")).toBeInTheDocument();
  expect(login).not.toHaveBeenCalled();
});

test("valid credentials are sent and the token is passed on", async () => {
  jest.spyOn(auth, "loginUser").mockResolvedValue({ token: "abc" });
  const onSignedIn = jest.fn();
  render(<SignInForm onSignedIn={onSignedIn} />);
  userEvent.type(screen.getByLabelText("Email:"), "ada@example.com");
  userEvent.type(screen.getByLabelText("Password:"), "harvest42");
  userEvent.click(screen.getByRole("button", { name: /login/i }));
  await waitFor(() => expect(onSignedIn).toHaveBeenCalledWith("abc"));
});

test("a rejected login shows the message of the server", async () => {
  jest.spyOn(auth, "loginUser").mockRejectedValue(new Error("Invalid Credentials"));
  render(<SignInForm />);
  userEvent.type(screen.getByLabelText("Email:"), "ada@example.com");
  userEvent.type(screen.getByLabelText("Password:"), "wrong");
  userEvent.click(screen.getByRole("button", { name: /login/i }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Invalid Credentials");
});
