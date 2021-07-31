import * as e from "../customTypes/authReqCustom";
import User from "../models/user";
import { Request, Response } from "express";
import Book from "../models/book";
import { unlink } from "fs";

export async function getUser(req: e.Express.Request, res: Response) {
  const data = req.query;
  try {
    const userInfo = await User.findOne({ email: data.email }).exec();
    if (!userInfo) return res.status(404).json({ error: "User not found" });
    const userBooks = await Book.find({ userId: userInfo?._id }).exec();
    res.status(200).json({ userInfo, userBooks });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function updateUserProfilePic(req: Request, res: Response) {
  const data = req.query;
  try {
    if (req.file == undefined) {
      return res.status(400).json({ message: "No image" });
    }
    const userBeforeUpdate = await User.findOne(data).exec();
    const user = await User.findOneAndUpdate(
      data,
      {
        profilePic: req.file.filename,
      },
      { new: true }
    ).exec();
    if (userBeforeUpdate?.profilePic)
      unlink("./images/" + userBeforeUpdate?.profilePic, (err) => {
        if (err) throw err;
      });
    res.status(200).json({
      imageUrl: user?.profilePic,
    });
  } catch (err: any) {
    res.status(400).json({ error: "Error" });
  }
}
