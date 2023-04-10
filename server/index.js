import express from "express"
import connectToDB from "./config/db.js"
import router from "./routes/authRoutes.js"
import cors from "cors"

const app = express()
const port = process.env.PORT || 3000

connectToDB().catch((error) => {
  console.error("Could not connect to the DB:", error.message)
  process.exit(1)
})

app.use(cors())
app.use(express.json())
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
