import { Router, Response } from "express";
import { CallbackError } from "mongoose";
import * as yup from "yup";
import Book from "../models/book";
import { IBook } from "../types/book";
import * as e from "./bookCustom";

const yupObject = yup.object().shape({
  author: yup.string().required(),
  title: yup.string().required(),
  userId: yup.string().required(),
});

export function addBook(req: e.Express.Request, res: Response) {
  const { author, title, userId } = req.body;
  yupObject
    .validate({ author, title, userId })
    .then(() => {
      const book = new Book({ author, title, userId });
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
  const { page = 1, limit = 10 } = req.query;
  try {
    const books = await Book.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Book.countDocuments();
    res.json({
      books,
      totalPages: Math.ceil(count / limit)
    });
  } catch (err: any) {
    console.error(err.message);
  }
}
