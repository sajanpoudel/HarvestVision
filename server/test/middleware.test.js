import { describe, it } from "node:test"
import assert from "node:assert/strict"
import jwt from "jsonwebtoken"

import { fakeResponse, mockUserModel } from "./helpers.js"

process.env.JWT_SECRET = "test-secret"

const users = [{ _id: "u1", name: "Ada", email: "ada@x.io" }]
mockUserModel(users)
const { default: checkIsUserAuthenticated } = await import("../middlewares/authMiddleware.js")

const run = async (headers) => {
  const req = { headers }
  const res = fakeResponse()
  let nextCalled = false
  await checkIsUserAuthenticated(req, res, () => {
    nextCalled = true
  })
  return { req, res, nextCalled }
}

describe("checkIsUserAuthenticated", () => {
  it("rejects a request without an authorization header", async () => {
    const { res, nextCalled } = await run({})
    assert.equal(res.statusCode, 400)
    assert.equal(nextCalled, false)
  })
})
