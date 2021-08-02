import { Router } from "express";
import * as userController from "../controllers/userController";
import getUserIdentity from "../middlewares/getUserIdentityMiddleware";
import uploadFile from "../middlewares/uploadMiddleware";
import withAuth from "../middlewares/withAuthMiddleware";

const userRoute: Router = Router();

userRoute.get("/me", getUserIdentity, userController.getUser);

userRoute.put(
  "/updateProfile",
  uploadFile,
  getUserIdentity,
  userController.updateUserProfilePic
);

export default userRoute;
