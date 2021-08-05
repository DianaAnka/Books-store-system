import { IBook } from "../types/book";
import { ObjectId } from "mongoose";
import Book from "../models/book";
import { BookDto } from "../dtoTypes/bookDto";
import { findUserByEmail } from "./userService";

export async function addBookToDatabase(data: IBook, email: string) {
  try {
    const user = await findUserByEmail(email);
    const book = new Book({ ...data, userId: user?._id });
    const bookExisting = await Book.findOne({
      author: book.author,
      title: book.title,
      userId: book.userId,
    });
    if (bookExisting) throw new Error("Error book exists");
    await book.save();
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export function buildSearchQuery(
  anyField: string,
  author: string,
  title: string,
  abstract: string
) {
  let searchQuery: string = "";
  if (anyField) searchQuery = anyField;
  else {
    if (author) searchQuery = `{author:"${author}"`;
    if (title) searchQuery += `,title:"${title}"`;
    if (abstract) searchQuery += `,abstract:"${abstract}"`;
  }
  return searchQuery;
}

export async function getBooksFromDataBase(data: BookDto) {
  let { page = 1, limit = 20, anyField, author, title, abstract } = data;
  limit = limit > 20 ? 20 : limit;
  const searchQuery = buildSearchQuery(anyField, author, title, abstract);
  let query = searchQuery.length > 0 ? { $text: { $search: searchQuery } } : {};
  const count = await Book.find(query).countDocuments();
  const books = await Book.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
  return { books, count, limit };
}
