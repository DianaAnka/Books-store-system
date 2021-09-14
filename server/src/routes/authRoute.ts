import { Router } from "express";
import * as authController from "../controllers/authController";

const authRoutes: Router = Router();

authRoutes.post("/register", authController.registerController);

authRoutes.post("/login", authController.loginController);

authRoutes.post("/logout", authController.logOutController);

export default authRoutes;
