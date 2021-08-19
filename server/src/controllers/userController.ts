import * as e from "../customTypes/authReqCustom";
import { Response } from "express";
import { getUserByEmail, updateUserByEmail } from "../services/userService";
import { getBooksByUserId } from "../services/bookService";
import uploadImageValidate from "../validation/uploadImageValidation";
import { deleteOldProfilePic } from "../lib/deleteOldProfilePic";
import { UserBookDto } from "../dtoTypes/bookDto";

export async function getUserController(req: e.Express.Request, res: Response) {
  const email = req.email;
  try {
    const { page = 1, limit = 10 } = req.query;
    const userInfo = await getUserByEmail(email!);
    const userBookDto: UserBookDto = {
      limit: isNaN(+limit) || limit > 20 ? 20 : Math.ceil(limit),
      page: isNaN(+page) ? 1 : Math.ceil(page),
      userId: userInfo?._id,
    };
    const { books, totalPages, totalCount } = await getBooksByUserId(
      userBookDto
    );
    res.status(200).json({
      userInfo,
      books,
      totalPages,
      totalCount,
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function updateUserProfilePicController(
  req: e.Express.Request,
  res: Response
) {
  const email = req.email;
  try {
    await uploadImageValidate.validate({ file: req.file });
    const user = await updateUserByEmail(email!, {
      profilePic: req.file.filename,
    });
    deleteOldProfilePic(user?.profilePic!);
    res.status(200).json({
      imageUrl: req.file.filename,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
