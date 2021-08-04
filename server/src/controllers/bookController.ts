import { Response } from "express";
import { CallbackError } from "mongoose";
import Book from "../models/book";
import { IBook } from "../types/book";
import * as e from "../customTypes/bookReqCustom";
import * as validate from "../validation/bookValidation";
import User from "../models/user";

export function addBook(req: e.Express.Request, res: Response) {
  const data = req.body;
  const email = req.email;
  validate.default
    .validate(data)
    .then(async () => {
      const user = await User.findOne({ email: email }).exec();
      if (!user) return res.status(400).json({ error: "User Not found" });
      const book = new Book({ ...data, userId: user._id });
      Book.findOne(
        { author: book.author, title: book.title, userId: book.userId },
        function (err: Error, bookExisting: IBook) {
          if (bookExisting)
            return res.status(400).json({ error: "Error book exists" });
          book.save(function (err: CallbackError) {
            if (err) res.status(500).json({ error: err.message });
            else res.status(200).json({ meassage: "Adding book is complete" });
          });
        }
      );
    })
    .catch(function (err: Error) {
      return res.status(400).json({ error: err.message });
    });
}

export async function getBooks(req: e.Express.Request, res: Response) {
  var { page = 1, limit = 20, anyField, author, title, abstract } = req.query;
  limit = limit > 20 ? 20 : limit;
  var searchQuery: string = "";
  try {
    var books: IBook[] = [];
    var count: number = 0;

    if (anyField) searchQuery = anyField;
    else {
      if (author) searchQuery = `{author:"${author}"`;
      if (title) searchQuery += `,title:"${title}"`;
      if (abstract) searchQuery += `,abstract:"${abstract}"`;
    }
    if (searchQuery.length > 0) {
      count = await Book.find({ $text: { $search: searchQuery } })
        .countDocuments()
        .exec();
      books = await Book.find({ $text: { $search: searchQuery } })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    } else {
      count = await Book.find().countDocuments().exec();
      books = await Book.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    }
    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      totalCount: count,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
}
