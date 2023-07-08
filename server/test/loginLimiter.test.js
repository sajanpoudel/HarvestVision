import { describe, it } from "node:test"
import assert from "node:assert/strict"

import { createLoginLimiter } from "../middlewares/loginLimiter.js"

describe("createLoginLimiter", () => {
  it("allows attempts until the limit is reached", () => {
    const limiter = createLoginLimiter({ maxFailures: 3, lockMs: 1000, now: () => 0 })
    for (let i = 0; i < 2; i++) limiter.recordFailure("a@x.io")
    assert.equal(limiter.waitMs("a@x.io"), 0)
    limiter.recordFailure("a@x.io")
    assert.equal(limiter.waitMs("a@x.io"), 1000)
  })

  it("unlocks after the lock time", () => {
    let clock = 0
    const limiter = createLoginLimiter({ maxFailures: 1, lockMs: 1000, now: () => clock })
    limiter.recordFailure("a@x.io")
    clock = 400
    assert.equal(limiter.waitMs("a@x.io"), 600)
    clock = 1000
    assert.equal(limiter.waitMs("a@x.io"), 0)
  })

  it("treats emails without caring about case or spaces", () => {
    const limiter = createLoginLimiter({ maxFailures: 1, lockMs: 1000, now: () => 0 })
    limiter.recordFailure(" A@X.io ")
    assert.equal(limiter.waitMs("a@x.io"), 1000)
  })

  it("forgets the failures after a good login", () => {
    const limiter = createLoginLimiter({ maxFailures: 2, lockMs: 1000, now: () => 0 })
    limiter.recordFailure("a@x.io")
    limiter.recordSuccess("a@x.io")
    limiter.recordFailure("a@x.io")
    assert.equal(limiter.waitMs("a@x.io"), 0)
  })

  it("keeps the accounts apart", () => {
    const limiter = createLoginLimiter({ maxFailures: 1, lockMs: 1000, now: () => 0 })
    limiter.recordFailure("a@x.io")
    assert.equal(limiter.waitMs("b@x.io"), 0)
  })
})
