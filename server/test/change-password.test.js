import { beforeEach, describe, it } from "node:test"
import assert from "node:assert/strict"
import bcryptjs from "bcryptjs"

import { fakeResponse, mockUserModel } from "./helpers.js"

process.env.JWT_SECRET = "test-secret"

const users = []
mockUserModel(users)
const { default: AuthController } = await import("../controllers/authController.js")

beforeEach(async () => {
  users.length = 0
  await AuthController.userRegistration(
    { body: { name: "Ada", email: "ada@x.io", password: "harvest42" } },
    fakeResponse()
  )
})

const change = async (body) => {
  const res = fakeResponse()
  await AuthController.changePassword({ body, user: { _id: users[0]._id } }, res)
  return res
}

describe("changePassword", () => {
  it("needs both passwords", async () => {
    const res = await change({ currentPassword: "harvest42" })
    assert.equal(res.statusCode, 400)
  })

  it("refuses a wrong current password", async () => {
    const res = await change({ currentPassword: "nope12345", newPassword: "fresh2024x" })
    assert.equal(res.statusCode, 400)
    assert.equal(res.body.message, "Current password is wrong")
    assert.ok(await bcryptjs.compare("harvest42", users[0].password))
  })

  it("refuses a weak new password", async () => {
    const res = await change({ currentPassword: "harvest42", newPassword: "weak" })
    assert.equal(res.statusCode, 400)
    assert.match(res.body.message, /at least 8 characters/)
  })

  it("stores a hash of the new password", async () => {
    const res = await change({ currentPassword: "harvest42", newPassword: "fresh2024x" })
    assert.equal(res.statusCode, 200)
    assert.ok(await bcryptjs.compare("fresh2024x", users[0].password))
    assert.notEqual(users[0].password, "fresh2024x")
  })
})
