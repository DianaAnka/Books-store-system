import * as e from "../customTypes/authReqCustom";
import { Response } from "express";
import { updateUserByEmail } from "../services/userService";
import { getBooksByUserId } from "../services/bookService";
import uploadImageValidate from "../validation/uploadImageValidation";
import { deleteOldProfilePic } from "../lib/fileSystemHandler";
import { UserBookDTO } from "../dtoTypes/bookDTO";
import { limitHandler, pageHandler } from "../lib/bookPaginationHandler";

export async function getUserController(req: e.Express.Request, res: Response) {
  const userInfo = req.user;
  try {
    const { page = 1, limit = 10 } = req.query;
    const userBookDTO: UserBookDTO = {
      limit: limitHandler(limit),
      page: pageHandler(page),
      userId: userInfo?._id,
    };
    const { books, totalPages, totalCount } = await getBooksByUserId(
      userBookDTO
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
  const user = req.user;
  try {
    await uploadImageValidate.validate({ file: req.file });
    await updateUserByEmail(user.email, {
      profilePic: req.file.filename,
    });
    deleteOldProfilePic(user.profilePic);
    res.status(200).json({
      imageUrl: req.file.filename,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getLoggedInUserController(
  req: e.Express.Request,
  res: Response
) {
  const user = req.user;
  return res.json({ user });
}
