import { Document, ObjectId } from "mongoose";

export interface IComment extends Document {
  content: string;
  bookId: ObjectId;
  parentId: ObjectId;
  user: { _id: ObjectId; email: string; profilePic: string };
}
