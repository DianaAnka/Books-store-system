import { IBook } from "../types/book";
import Book from "../models/book";
import { SearchedBookDto, UserBookDto } from "../dtoTypes/bookDto";
import { ObjectId } from "mongoose";
import { paginationValidate } from "../validation/paginationValidation";

export async function isNotDuplicatedBook(book: IBook) {
  const bookExisted = await Book.findOne({
    author: book.author,
    title: book.title,
    userId: book.userId,
  });
  if (bookExisted) throw new Error("Book already exists");
}

export async function addBook(data: IBook, id: ObjectId) {
  const book = new Book({ ...data, userId: id });
  await book.save();
}

export function buildSearchQuery(params: {
  anyField: string;
  author: string;
  title: string;
  abstract: string;
}) {
  let searchQuery: string = "";
  if (params.anyField) searchQuery = params.anyField;
  else {
    if (params.author) searchQuery = `{author:"${params.author}"`;
    if (params.title) searchQuery += `,title:"${params.title}"`;
    if (params.abstract) searchQuery += `,abstract:"${params.abstract}"}`;
  }
  const query =
    searchQuery.length > 0 ? { $text: { $search: searchQuery } } : {};
  return query;
}

async function getBooks(query: object, limit: number, page: number) {
  const totalCount = await Book.find(query).countDocuments();
  const books = await Book.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
  const totalPages = Math.ceil(totalCount / limit);
  return { books, totalPages, totalCount };
}

export async function searchBooks(data: SearchedBookDto) {
  const { page = 1, limit = 10 } = paginationValidate(data);
  const query = buildSearchQuery(data);
  const { books, totalPages, totalCount } = await getBooks(query, limit, page);
  return { books, totalPages, totalCount };
}

export async function getBooksByUserId(userBookDto: UserBookDto) {
  const query = { userId: userBookDto.userId };
  const { books, totalPages, totalCount } = await getBooks(
    query,
    userBookDto.limit,
    userBookDto.page
  );
  return { books, totalPages, totalCount };
}
