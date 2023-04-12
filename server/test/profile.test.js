import { describe, it } from "node:test"
import assert from "node:assert/strict"

import { fakeResponse, mockUserModel } from "./helpers.js"

process.env.JWT_SECRET = "test-secret"

mockUserModel([])
const { default: AuthController } = await import("../controllers/authController.js")

describe("profile", () => {
  it("returns the signed in user without any password", async () => {
    const res = fakeResponse()
    await AuthController.profile({ user: { _id: "u1", name: "Ada", email: "ada@x.io" } }, res)
    assert.equal(res.statusCode, 200)
    assert.deepEqual(res.body, { user: { id: "u1", name: "Ada", email: "ada@x.io" } })
  })
})
