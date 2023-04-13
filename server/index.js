import express from "express"
import connectToDB from "./config/db.js"
import router from "./routes/authRoutes.js"
import cors from "cors"

const app = express()
const port = 3000

connectToDB()

app.use(cors())
app.use(express.json())
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})