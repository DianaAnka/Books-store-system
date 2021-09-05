import { Router } from "express";
import * as authController from "../controllers/authController";
import getUserIdentity from "../middlewares/getUserIdentityMiddleware";

const authRoutes: Router = Router();

authRoutes.post("/register", authController.registerController);

authRoutes.post("/login", authController.loginController);

authRoutes.get("/users/me", getUserIdentity, authController.isLoggedInController);

authRoutes.post("/logout", authController.logOutController);

export default authRoutes;
