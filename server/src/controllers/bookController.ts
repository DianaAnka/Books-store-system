import { Response, Request } from "express";
import * as e from "../customTypes/bookReqCustom";
import bookValidate from "../validation/bookValidation";
import {
  addBook,
  ensureNotDuplicatedBook,
  getBookById,
  searchBooks,
} from "../services/bookService";
import { AddBookDTO, GetBooksDTO } from "../dtoTypes/bookDTO";
import { limitHandler, pageHandler } from "../lib/bookPaginationHandler";

export async function addBookController(req: e.Express.Request, res: Response) {
  const addBookDTO: AddBookDTO = req.body.book;
  const user = req.user;
  try {
    await bookValidate.validate(addBookDTO);
    await ensureNotDuplicatedBook(addBookDTO, user?._id);
    await addBook(addBookDTO, user?._id);
    return res.status(200).json({ meassage: "Adding book is complete" });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function getBookController(req: e.Express.Request, res: Response) {
  const { id } = req.params;
  try {
    const book = await getBookById(id);
    return res.json({ book });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function getBooksController(
  req: e.Express.Request,
  res: Response
) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const getBookDTO: GetBooksDTO = {
      ...req.query,
      limit: limitHandler(limit),
      page: pageHandler(page),
    };
    const { books, totalPages, totalCount } = await searchBooks(getBookDTO);
    res.json({
      books,
      totalPages,
      totalCount,
    });
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
}
