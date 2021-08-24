import { Router } from "express";
import * as commentController from "../controllers/commentController";
import getUserIdentity from "../middlewares/getUserIdentityMiddleware";

const commentRoutes: Router = Router();

commentRoutes.post(
  "/comment",
  getUserIdentity,
  commentController.addCommentController
);

commentRoutes.put(
  "/comment/:id",
  getUserIdentity,
  commentController.updateCommentController
);

commentRoutes.delete(
  "/comment/:id",
  getUserIdentity,
  commentController.deleteCommentController
);

commentRoutes.get(
  "/book/:id/comments",
  getUserIdentity,
  commentController.getCommentsByBookController
);

export default commentRoutes;
