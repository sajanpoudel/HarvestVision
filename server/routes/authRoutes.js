import express from "express"
import AuthController from "../controllers/authController.js"

const router = express.Router()

router.post("/user/register", AuthController.userRegistration)
router.post("/user/login", AuthController.userLogin)

//Protected routes
router.post("/change-password", AuthController.changePassword)


export default router