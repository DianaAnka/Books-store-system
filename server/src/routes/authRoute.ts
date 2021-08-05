import { Router } from "express";
import * as authController from "../controllers/authController";
import getUserIdentity from "../middlewares/getUserIdentityMiddleware";

const router: Router = Router();

router.post("/api/register", authController.register);

router.post("/api/login", authController.login);

router.get("/api/isLoggedIn", getUserIdentity, authController.isLoggedIn);

router.put("/api/logout", authController.logOut);

export default router;
