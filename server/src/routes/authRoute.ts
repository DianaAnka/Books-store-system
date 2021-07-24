import { Router } from "express";
import * as authController from "../controllers/authController";

const router: Router = Router();

router.post("/api/register", authController.register);

router.post("/api/login", authController.login);

export default router;
