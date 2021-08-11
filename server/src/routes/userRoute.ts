import { Router } from "express";
import * as userController from "../controllers/userController";
import getUserIdentity from "../middlewares/getUserIdentityMiddleware";
import uploadFile from "../middlewares/uploadMiddleware";

const userRoute: Router = Router();

userRoute.get("/me", getUserIdentity, userController.getUserController);

userRoute.put(
  "/updateProfile",
  uploadFile,
  getUserIdentity,
  userController.updateUserProfilePicController
);

export default userRoute;
