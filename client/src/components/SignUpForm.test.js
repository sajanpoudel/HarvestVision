import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpForm from "./SignUpForm";
import * as auth from "../api/auth";

afterEach(() => jest.restoreAllMocks());

const fill = (values) => {
  userEvent.type(screen.getByLabelText("Name:"), values.name);
  userEvent.type(screen.getByLabelText("Email:"), values.email);
  userEvent.type(screen.getByLabelText("Password:"), values.password);
  userEvent.type(screen.getByLabelText("Confirm Password:"), values.confirm);
};

test("mismatching passwords are reported and nothing is sent", async () => {
  const register = jest.spyOn(auth, "registerUser");
  render(<SignUpForm />);
  fill({ name: "Ada", email: "ada@example.com", password: "harvest42", confirm: "other" });
  userEvent.click(screen.getByRole("button", { name: /signup/i }));
  expect(await screen.findByText("The passwords do not match.")).toBeInTheDocument();
  expect(register).not.toHaveBeenCalled();
});

test("a valid form registers the user and says so", async () => {
  const register = jest.spyOn(auth, "registerUser").mockResolvedValue({ message: "ok" });
  render(<SignUpForm />);
  fill({ name: "Ada", email: "ada@example.com", password: "harvest42", confirm: "harvest42" });
  userEvent.click(screen.getByRole("button", { name: /signup/i }));
  await waitFor(() => expect(screen.getByRole("status")).toBeInTheDocument());
  expect(register).toHaveBeenCalledWith({ name: "Ada", email: "ada@example.com", password: "harvest42" });
});

test("a server error is shown", async () => {
  jest.spyOn(auth, "registerUser").mockRejectedValue(new Error("User already registered!"));
  render(<SignUpForm />);
  fill({ name: "Ada", email: "ada@example.com", password: "harvest42", confirm: "harvest42" });
  userEvent.click(screen.getByRole("button", { name: /signup/i }));
  expect(await screen.findByRole("alert")).toHaveTextContent("User already registered!");
});
