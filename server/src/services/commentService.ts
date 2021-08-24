import { ObjectId } from "mongoose";
import { IUser } from "../types/user";
import Comment from "../models/comment";
import { AddCommentDTO, UpdateCommentDTO } from "../dtoTypes/commentDTO";
import { IComment } from "../types/comment";

export async function addComment(addCommentDTO: AddCommentDTO, user: IUser) {
  const comment = new Comment({ ...addCommentDTO, user });
  await comment.save();
}

export async function getCommentById(id: ObjectId) {
  const comment = await Comment.findById(id).exec();
  if (!comment) throw new Error("comment not found");
  return comment;
}

export async function getCommentByBookId(bookId: ObjectId) {
  return await Comment.find({ bookId });
}

export async function updateComment(
  id: ObjectId,
  updateCommentDTO: UpdateCommentDTO
) {
  return await Comment.findOneAndUpdate({ _id: id }, updateCommentDTO).exec();
}

export async function deleteCommentById(_id: ObjectId) {
  return await Comment.deleteOne({ _id }).exec();
}

export async function deleteReplies(comment: IComment) {
  const replies = await Comment.find({ parentId: comment._id });
  replies.map(async (reply) => await deleteCommentById(reply._id));
}

export async function deleteComment(comment: IComment) {
  if (comment.parentId == null) await deleteReplies(comment);
  await deleteCommentById(comment.id);
}

export function checkCommentOwnership(user: IUser, comment: IComment) {
  if (!user._id.equals(comment.user._id))
    throw new Error("User doesn't have access on comment");
}

export async function checkCommentParent(comment: AddCommentDTO) {
  if (comment.parentId) {
    const commentParent = await getCommentById(comment.parentId);
    if (!commentParent) throw new Error("comment parent not found");
  }
}
