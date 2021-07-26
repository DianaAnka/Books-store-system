import * as e from "../customTypes/authReqCustom";
import User from "../models/user";
import { Request, Response } from "express";
import book from "../models/book";
import uploadFile from "../middlewares/uploadMiddleware";
import { unlink } from "fs";

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

export async function updateUserProfilePic(req: Request, res: Response) {
  try {
    await uploadFile(req, res);
    if (req.file == undefined) {
      return res.status(400).json({ message: "Please upload an image!" });
    }
    try {
      const data = req.query;
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
          console.log("old image was deleted");
        });
      res.status(200).json({
        imageUrl: user?.profilePic,
      });
    } catch (err: any) {
      res.status(400).json({ error: "Error" });
      console.log(err.message);
    }
  } catch (err) {
    console.log("error ", err);
    res.status(500).json({
      message: err,
    });
  }
}
