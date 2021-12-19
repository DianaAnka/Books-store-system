import { Router } from "express";
import * as commentController from "../controllers/commentController";
import addUserIdentity from "../middlewares/addUserIdentityMiddleware";

const commentRoutes: Router = Router();

commentRoutes.put(
  "/:id",
  addUserIdentity,
  commentController.updateCommentController
);

commentRoutes.delete(
  "/:id",
  addUserIdentity,
  commentController.deleteCommentController
);

export default commentRoutes;
