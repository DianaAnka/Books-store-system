import { Router } from "express";
import * as commentController from "../controllers/commentController";
import addUserIdentity from "../middlewares/addUserIdentityMiddleware";

const bookCommentsRoutes: Router = Router();

bookCommentsRoutes.post(
  "/",
  addUserIdentity,
  commentController.addCommentController
);

bookCommentsRoutes.get("/", commentController.getCommentsByBookController);

export default bookCommentsRoutes;
