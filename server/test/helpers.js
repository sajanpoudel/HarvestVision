import { mock } from "node:test"

// A response object that records the status and the body that a controller sends.
export function fakeResponse() {
  const res = { statusCode: 200, body: undefined }
  res.status = (code) => {
    res.statusCode = code
    return res
  }
  res.json = (payload) => {
    res.body = payload
    return res
  }
  return res
}

// Replaces the user model with an in memory fake and returns the fake.
export function mockUserModel(users = []) {
  class FakeUser {
    constructor(data) {
      Object.assign(this, data)
      this._id = `id-${users.length + 1}`
    }
    async save() {
      users.push(this)
      return this
    }
    static async findOne({ email }) {
      return users.find((u) => u.email === email) || null
    }
    static findById(id) {
      const found = users.find((u) => u._id === id) || null
      return { select: async () => (found ? { _id: found._id, name: found.name, email: found.email } : null) }
    }
  }
  mock.module(new URL("../models/authModel.js", import.meta.url).href, { defaultExport: FakeUser })
  return { FakeUser, users }
}
