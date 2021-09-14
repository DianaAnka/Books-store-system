import { Router } from "express";
import * as userController from "../controllers/userController";
import * as authController from "../controllers/authController";
import addUserIdentity from "../middlewares/addUserIdentityMiddleware";
import uploadFile from "../middlewares/uploadMiddleware";

const userRoutes: Router = Router();

userRoutes.get("/:id", addUserIdentity, userController.getUserController);

userRoutes.put(
  "/:id/profilePic",
  uploadFile,
  addUserIdentity,
  userController.updateUserProfilePicController
);

userRoutes.get(
  "/me",
  addUserIdentity,
  userController.getLoggedInUserController
);

export default userRoutes;
