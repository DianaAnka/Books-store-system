import { Router } from "express";
import * as bookController from "../controllers/bookController";
import * as ratingController from "../controllers/ratingController";
import addUserIdentity from "../middlewares/addUserIdentityMiddleware";
import bookCommentsRoutes from "./bookCommentsRoute";

const bookRoutes: Router = Router();

bookRoutes.get("/", bookController.getBooksController);

bookRoutes.get("/:id", bookController.getBookController);

bookRoutes.post("/", addUserIdentity, bookController.addBookController);


bookRoutes.put(
    "/:id/like",
    addUserIdentity,
    ratingController.updateLikeRatingController
  );

bookRoutes.put(
  "/:id/dislike",
  addUserIdentity,
  ratingController.updateDislikeRatingController
);

bookRoutes.get(
  "/:id/rates",
  addUserIdentity,
  ratingController.getUserRateByBookController
);

bookRoutes.use('/:id/comments', bookCommentsRoutes)

export default bookRoutes;
