import { IComment } from "./../types/comment";
import { model, Schema } from "mongoose";

const userSchema: Schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
});

const commentSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    bookId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    user: {
      type: userSchema,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IComment>("Comment", commentSchema);
