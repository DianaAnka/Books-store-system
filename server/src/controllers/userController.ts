import * as e from "../customTypes/authReqCustom";
import User from "../models/user";
import { Response } from "express";
import book from "../models/book";

export async function getUser(req: e.Express.Request, res: Response) {
  const data = req.query;
  try {
    const userInfo = await User.findOne({ email: data.email }).exec();
    const userBooks = await book.find({ userId: userInfo?._id }).exec();
    res.status(200).json({ userInfo, userBooks });
  } catch (err: any) {
    console.log(err.message);
  }
}

export async function updateUserProfilePic(
  req: e.Express.Request,
  res: Response
) {
  if (!req.body.profilePic) {
    return res.status(400).json({
      error: "Profile Picture can not be empty",
    });
  }
  const data = req.query;
  try {
    const user = await User.findOneAndUpdate(data, {
      profilePic: req.body.profilePic,
    }).exec();
    res.status(200).json({ user });
  } catch (err: any) {
    res.status(400).json({ error: "Error" });
    console.log(err.message);
  }
}
