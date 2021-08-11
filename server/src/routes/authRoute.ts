import { Router } from "express";
import * as authController from "../controllers/authController";
import getUserIdentity from "../middlewares/getUserIdentityMiddleware";

const router: Router = Router();

router.post("/register", authController.registerController);

router.post("/login", authController.loginController);

router.get("/isLoggedIn", getUserIdentity, authController.isLoggedInController);

router.post("/logout", authController.logOutController);

export default router;
