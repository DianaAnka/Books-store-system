import { Document, ObjectId } from "mongoose";

export interface IBook extends Document {
  _id: ObjectId;
  author: string;
  title: string;
  content: string;
  abstract: string;
  tags: [string];
  userId: ObjectId;
  likesCount: number;
  dislikesCount: number;
}
