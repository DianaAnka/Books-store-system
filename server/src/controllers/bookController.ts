import { Response } from "express";
import * as e from "../customTypes/bookReqCustom";
import * as validate from "../validation/bookValidation";
import {
  addBookToDatabase,
  getBooksFromDataBase,
} from "../services/bookService";

export async function addBook(req: e.Express.Request, res: Response) {
  const data = req.body;
  const email = req.email;
  try {
    await validate.default.validate(data);
    await addBookToDatabase(data, email);
    return res.status(200).json({ meassage: "Adding book is complete" });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function getBooks(req: e.Express.Request, res: Response) {
  try {
    const { books, count, limit } = await getBooksFromDataBase(req.query);
    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      totalCount: count,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
}
