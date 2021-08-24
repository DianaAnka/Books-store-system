import { ObjectId } from "mongoose";

export interface AddCommentDTO {
  content: string;
  bookId: ObjectId;
  parentId: ObjectId;
}

export interface UpdateCommentDTO {
  content: string;
}

export interface DeleteCommentDto{
    
}
