// Calls to the authentication endpoints of the server.
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api/v1";

async function post(path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }
  return data;
}

export const registerUser = ({ name, email, password }) =>
  post("/user/register", { name, email, password });

export const loginUser = ({ email, password }) => post("/user/login", { email, password });
