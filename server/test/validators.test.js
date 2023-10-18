import { describe, it } from "node:test"
import assert from "node:assert/strict"

import { isStrongPassword, isValidEmail } from "../utils/validators.js"

describe("isValidEmail", () => {
  it("accepts ordinary addresses", () => {
    assert.equal(isValidEmail("ada@example.com"), true)
    assert.equal(isValidEmail("  ada@example.com "), true)
  })

  it("rejects text that is not an address", () => {
    for (const value of ["", "ada", "ada@", "@example.com", "ada@example", "a b@example.com", null, 12]) {
      assert.equal(isValidEmail(value), false, String(value))
    }
  })
})

describe("isStrongPassword", () => {
  it("needs eight characters with a letter and a digit", () => {
    assert.equal(isStrongPassword("harvest42"), true)
    assert.equal(isStrongPassword("short1"), false)
    assert.equal(isStrongPassword("onlyletters"), false)
    assert.equal(isStrongPassword("12345678"), false)
    assert.equal(isStrongPassword(undefined), false)
  })
})
