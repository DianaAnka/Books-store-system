import * as e from "../customTypes/authReqCustom";
import User from "../models/user";
import { Request, Response } from "express";
import Book from "../models/book";
import { unlink } from "fs";

export async function getUser(req: e.Express.Request, res: Response) {
  const email = req.email;
  var { page = 1, limit = 20 } = req.query;
  limit = limit > 20 ? 20 : limit;
  try {
    const userInfo = await User.findOne({ email: email }).exec();
    if (!userInfo) return res.status(404).json({ error: "User not found" });
    const count = await Book.find({ userId: userInfo?._id })
      .countDocuments()
      .exec();
    const userBooks = await Book.find({ userId: userInfo?._id })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    res
      .status(200)
      .json({ userInfo, userBooks, totalPages: Math.ceil(count / limit) });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function updateUserProfilePic(
  req: e.Express.Request,
  res: Response
) {
  const email = req.email;
  try {
    if (req.file == undefined) {
      console.log("no image");
      return res.status(400).json({ message: "No image" });
    }
    const userBeforeUpdate = await User.findOne({ email }).exec();
    const user = await User.findOneAndUpdate(
      { email },
      {
        profilePic: req.file.filename,
      },
      { new: true }
    ).exec();
    if (userBeforeUpdate?.profilePic)
      unlink("./images/" + userBeforeUpdate?.profilePic, (err) => {
        if (err) console.log(err);
      });
    res.status(200).json({
      imageUrl: user?.profilePic,
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
}
