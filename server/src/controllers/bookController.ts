import { Response } from "express";
import * as e from "../customTypes/bookReqCustom";
import bookValidate from "../validation/bookValidation";
import {
  addBook,
  insureNotDuplicatedBook,
  searchBooks,
} from "../services/bookService";
import { getUserByEmail } from "../services/userService";
import { SearchedBookDto } from "../dtoTypes/bookDto";

export async function addBookController(req: e.Express.Request, res: Response) {
  const book = req.body.book;
  const email = req.email;
  try {
    await bookValidate.validate(book);
    const user = await getUserByEmail(email);
    if (!user) return res.status(400).json({ error: "user not found" });
    await insureNotDuplicatedBook(book);
    await addBook(book, user?._id);
    return res.status(200).json({ meassage: "Adding book is complete" });
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
    const bookSearchDto: SearchedBookDto = {
      limit: isNaN(+limit) || limit > 20 ? 20 : Math.ceil(limit),
      page: isNaN(+page) ? 1 : Math.ceil(page),
      ...req.query,
    };
    const { books, totalPages, totalCount } = await searchBooks(bookSearchDto);
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
