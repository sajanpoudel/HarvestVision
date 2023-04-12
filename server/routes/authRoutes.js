import express from "express";
import AuthController from "../controllers/authController.js";
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);

//Protected routes
router.get("/user/me", checkIsUserAuthenticated, AuthController.profile);
router.post("/change-password", checkIsUserAuthenticated, AuthController.changePassword);

export default router;
