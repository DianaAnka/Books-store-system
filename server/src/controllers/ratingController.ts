import { Response } from "express";
import * as e from "../customTypes/ratingReqCustom";
import {
  updateLikesCountOfBookById,
  updateDislikesCountOfBookById,
  checkPrevLike,
  checkPrevDislike,
} from "../services/ratingService";

export async function updateLikeRatingController(
  req: e.Express.Request,
  res: Response
) {
  const { id } = req.params;
  const user = req.user;
  try {
    checkPrevDislike(user, id);
    await updateLikesCountOfBookById(id, user);
    return res.status(200).json({ meassage: "Updating rate is complete" });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function updateDislikeRatingController(
  req: e.Express.Request,
  res: Response
) {
  const { id } = req.params;
  const user = req.user;
  try {
    checkPrevLike(user, id);
    await updateDislikesCountOfBookById(id, user);
    return res.status(200).json({ meassage: "Updating rate is complete" });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}
