import * as e from "../customTypes/commentReqCustom";
import { getBookById } from "../services/bookService";
import {
  addComment,
  checkCommentOwnership,
  checkCommentParent,
  deleteComment,
  getCommentByBookId,
  getCommentById,
  updateComment,
} from "../services/commentService";
import commentValidate from "../validation/commentValidation";
import { Response } from "express";
import { AddCommentDTO, UpdateCommentDTO } from "../dtoTypes/commentDTO";

export async function addCommentController(
  req: e.Express.Request,
  res: Response
) {
  const addCommentDTO: AddCommentDTO = req.body.comment;
  const user = req.user;
  try {
    await commentValidate.validate(addCommentDTO);
    await getBookById(addCommentDTO.bookId);
    checkCommentParent(addCommentDTO);
    await addComment(addCommentDTO, user!);
    return res.status(200).json({ meassage: "Adding comment is complete" });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function updateCommentController(
  req: e.Express.Request,
  res: Response
) {
  const { id } = req.params;
  const updateCommentDTO: UpdateCommentDTO = req.body.comment;
  const user = req.user;
  try {
    await commentValidate.validate(updateCommentDTO);
    const comment = await getCommentById(id);
    checkCommentOwnership(user!, comment);
    await updateComment(id, updateCommentDTO);
    return res.status(200).json({ meassage: "Updating comment is complete" });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function deleteCommentController(
  req: e.Express.Request,
  res: Response
) {
  const { id } = req.params;
  const user = req.user;
  try {
    const comment = await getCommentById(id);
    checkCommentOwnership(user!, comment);
    await deleteComment(comment);
    return res.status(200).json({ meassage: "delete comment is complete" });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function getCommentsByBookController(
  req: e.Express.Request,
  res: Response
) {
  const { id } = req.params;
  try {
    await getBookById(id);
    const comments = await getCommentByBookId(id);
    res.json({ comments });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}
