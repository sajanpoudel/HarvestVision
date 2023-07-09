import { beforeEach, describe, it } from "node:test"
import assert from "node:assert/strict"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

import { fakeResponse, mockUserModel } from "./helpers.js"

process.env.JWT_SECRET = "test-secret"

const users = []
mockUserModel(users)
const { default: AuthController } = await import("../controllers/authController.js")

beforeEach(() => {
  users.length = 0
})

async function register(email, password) {
  await AuthController.userRegistration({ body: { name: "Ada", email, password } }, fakeResponse())
}

describe("userLogin", () => {
  it("needs both an email and a password", async () => {
    const res = fakeResponse()
    await AuthController.userLogin({ body: { email: "a@b.c" } }, res)
    assert.equal(res.statusCode, 400)
    assert.equal(res.body.message, "Both credentials are required!")
  })

  it("asks unknown users to register", async () => {
    const res = fakeResponse()
    await AuthController.userLogin({ body: { email: "nobody@x.io", password: "pw" } }, res)
    assert.equal(res.statusCode, 400)
    assert.match(res.body.message, /not registered/)
  })

  it("locks an email after five wrong passwords", async () => {
    await register("lock@x.io", "harvest42")
    for (let i = 0; i < 5; i++) {
      await AuthController.userLogin({ body: { email: "lock@x.io", password: "wrong-pass1" } }, fakeResponse())
    }
    const res = fakeResponse()
    await AuthController.userLogin({ body: { email: "lock@x.io", password: "harvest42" } }, res)
    assert.equal(res.statusCode, 429)
    assert.match(res.body.message, /Too many failed attempts/)
  })
})
