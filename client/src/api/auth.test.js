import { loginUser, registerUser } from "./auth";

const reply = (ok, body) => Promise.resolve({ ok, json: () => Promise.resolve(body) });

afterEach(() => {
  delete global.fetch;
});

test("loginUser posts the credentials and returns the token", async () => {
  global.fetch = jest.fn(() => reply(true, { message: "Login Successfull", token: "abc" }));
  const data = await loginUser({ email: "a@b.co", password: "harvest42" });
  expect(data.token).toBe("abc");
  const [url, options] = global.fetch.mock.calls[0];
  expect(url).toMatch(/\/user\/login$/);
  expect(JSON.parse(options.body)).toEqual({ email: "a@b.co", password: "harvest42" });
});

test("a failed request throws the message of the server", async () => {
  global.fetch = jest.fn(() => reply(false, { message: "Invalid Credentials" }));
  await expect(loginUser({ email: "a@b.co", password: "x" })).rejects.toThrow("Invalid Credentials");
});

test("registerUser sends the name too", async () => {
  global.fetch = jest.fn(() => reply(true, { message: "User Registration Successfull" }));
  await registerUser({ name: "Ada", email: "a@b.co", password: "harvest42" });
  expect(JSON.parse(global.fetch.mock.calls[0][1].body).name).toBe("Ada");
});
