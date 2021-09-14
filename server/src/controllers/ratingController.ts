import { Response } from "express";
import * as e from "../customTypes/ratingReqCustom";
import {
  updateLikesCountOfBookById,
  updateDislikesCountOfBookById,
  getUserRateByBook,
} from "../services/ratingService";

export async function updateLikeRatingController(
  req: e.Express.Request,
  res: Response
) {
  const { id: bookId } = req.params;
  const user = req.user;
  try {
    await updateLikesCountOfBookById(bookId, user);
    return res.status(200).json({ meassage: "Updating rate is complete" });
  } catch (err: any) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

export async function updateDislikeRatingController(
  req: e.Express.Request,
  res: Response
) {
  const { id: bookId } = req.params;
  const user = req.user;
  try {
    await updateDislikesCountOfBookById(bookId, user);
    return res.status(200).json({ message: "Updating rate is complete" });
  } catch (err: any) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

export async function getUserRateByBookController(
  req: e.Express.Request,
  res: Response
) {
  const { id: bookId } = req.params;
  const user = req.user;
  try {
    const rate = getUserRateByBook(user, bookId);
    return res.status(200).json({ rate });
  } catch (err: any) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}
