import { Router } from "express";
import * as ratingController from "../controllers/ratingController";
import getUserIdentity from "../middlewares/getUserIdentityMiddleware";

const ratingRoutes: Router = Router();

ratingRoutes.put(
  "/book/:id/like",
  getUserIdentity,
  ratingController.updateLikeRatingController
);

ratingRoutes.put(
  "/book/:id/dislike",
  getUserIdentity,
  ratingController.updateDislikeRatingController
);

export default ratingRoutes;
