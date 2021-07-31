import { IBook } from "./../types/book";
import { model, Schema } from "mongoose";
import { IUser } from "./../types/user";

const bookSchema: Schema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
    },
    abstract: {
      type: String,
    },
    tags: {
      type: [String],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: function (idVal: Schema.Types.ObjectId) {
          return new Promise(function (resolve, reject) {
            let Users = model("User");
            Users.findOne({ _id: idVal }, (err: Error, user: IUser) =>
              resolve(user ? true : false)
            );
          });
        },
        message: "User doesn't exist",
      },
    },
    likesCount: {
      type: Number,
    },
    dislikesCount: {
      type: Number,
    },
  },
  { timestamps: true }
);
bookSchema.index({ author: "text", title: "text", abstract: "text" });
export default model<IBook>("Book", bookSchema);
