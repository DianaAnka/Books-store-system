import { Router } from "express";
import * as userController from "../controllers/userController";
import withAuth from "../middlewares/withAuthMiddleware";

const userRoute: Router = Router();

userRoute.get("/me", withAuth, userController.getUser);

userRoute.put("/updateProfile", withAuth, userController.updateUserProfilePic);

export default userRoute;
