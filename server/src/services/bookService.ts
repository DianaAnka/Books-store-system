import Book from "../models/book";
import { AddBookDTO, GetBooksDTO, UserBookDTO } from "../dtoTypes/bookDTO";
import { ObjectId } from "mongoose";

export async function ensureNotDuplicatedBook(
  book: AddBookDTO,
  userId: ObjectId
) {
  const bookExisted = await Book.findOne({
    author: book.author,
    title: book.title,
    userId: userId,
  });
  if (bookExisted) throw new Error("Book already exists");
}

export async function addBook(addBookDTO: AddBookDTO, userId: ObjectId) {
  const book = new Book({ ...addBookDTO, userId });
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

export async function searchBooks(searchedBookDTO: GetBooksDTO) {
  const query = buildSearchQuery(searchedBookDTO);
  const { books, totalPages, totalCount } = await getBooks(
    query,
    searchedBookDTO.limit,
    searchedBookDTO.page
  );
  return { books, totalPages, totalCount };
}

export async function getBooksByUserId(userBookDTO: UserBookDTO) {
  const query = { userId: userBookDTO.userId };
  const { books, totalPages, totalCount } = await getBooks(
    query,
    userBookDTO.limit,
    userBookDTO.page
  );
  return { books, totalPages, totalCount };
}

export async function getBookById(id: ObjectId) {
  return await Book.findById(id);
}

export async function ensureBookExist(id: ObjectId) {
  const book = await getBookById(id);
  if (!book) throw new Error("Book not found");
}
