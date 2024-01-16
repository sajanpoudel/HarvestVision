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

  it("rejects a header that is not a bearer token", async () => {
    const { res, nextCalled } = await run({ authorization: "Basic abc" })
    assert.equal(res.body.message, "Unauthorized User")
    assert.equal(nextCalled, false)
  })

  it("rejects a token signed with another secret", async () => {
    const token = jwt.sign({ userID: "u1" }, "other-secret")
    const { res, nextCalled } = await run({ authorization: `Bearer ${token}` })
    assert.equal(res.statusCode, 400)
    assert.equal(nextCalled, false)
  })

  it("accepts a valid token and attaches the user without the password", async () => {
    const token = jwt.sign({ userID: "u1" }, "test-secret")
    const { req, nextCalled } = await run({ authorization: `Bearer ${token}` })
    assert.equal(nextCalled, true)
    assert.equal(req.user.email, "ada@x.io")
    assert.equal("password" in req.user, false)
  })

  it("rejects an expired token", async () => {
    const token = jwt.sign({ userID: "u1" }, "test-secret", { expiresIn: -10 })
    const { res, nextCalled } = await run({ authorization: `Bearer ${token}` })
    assert.equal(res.statusCode, 400)
    assert.equal(nextCalled, false)
  })

  it("rejects a request without an authorization header", async () => {
    const { res, nextCalled } = await run({})
    assert.equal(res.statusCode, 400)
    assert.equal(nextCalled, false)
  })
})
