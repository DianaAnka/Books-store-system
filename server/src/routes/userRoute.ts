import { Router } from "express";
import * as userController from "../controllers/userController";
import getUserIdentity from "../middlewares/getUserIdentityMiddleware";
import uploadFile from "../middlewares/uploadMiddleware";

const userRoutes: Router = Router();

userRoutes.get("/me", getUserIdentity, userController.getUserController);

userRoutes.put(
  "/updateProfile",
  uploadFile,
  getUserIdentity,
  userController.updateUserProfilePicController
);

export default userRoutes;
