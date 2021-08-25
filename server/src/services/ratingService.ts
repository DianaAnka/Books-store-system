import { ObjectId } from "mongoose";
import Book from "../models/book";
import { IBook } from "../types/book";
import { IUser } from "../types/user";
import { getBookById } from "./bookService";
import { updateUserRate } from "./userService";

export async function updateLikesCountOfBookById(id: ObjectId, user: IUser) {
  const book = await getBookById(id);
  const query = buildLikeQuery(
    book,
    ensureUserNotRateBook(user, id.toString())
  );
  await updateBookRate(id, query);
  await updateUserRate(
    user,
    id.toString(),
    ensureUserNotRateBook(user, id.toString()) ? 1 : 0
  );
}

export async function updateDislikesCountOfBookById(id: ObjectId, user: IUser) {
  const book = await getBookById(id);
  const query = buildDislikeQuery(
    book,
    ensureUserNotRateBook(user, id.toString())
  );
  await updateBookRate(id, query);
  await updateUserRate(
    user,
    id.toString(),
    ensureUserNotRateBook(user, id.toString()) ? -1 : 0
  );
}

function buildLikeQuery(book: IBook, rate: boolean) {
  let query = rate
    ? { likesCount: book.likesCount + 1 }
    : { likesCount: book.likesCount - 1 };
  return query;
}

function buildDislikeQuery(book: IBook, rate: boolean) {
  let query = rate
    ? { dislikesCount: book.dislikesCount + 1 }
    : { dislikesCount: book.dislikesCount - 1 };
  return query;
}

export async function updateBookRate(_id: ObjectId, query: object) {
  return await Book.findByIdAndUpdate(_id, query);
}

export function ensureUserNotRateBook(user: IUser, id: string) {
  return !(id in user.rates && user.rates[id] != 0);
}

export function checkPrevLike(user: IUser, id: string) {
  if (id in user.rates && user.rates[id] == 1)
    throw new Error("You have already rate this book with the opposite rate");
}

export function checkPrevDislike(user: IUser, id: string) {
  if (id in user.rates && user.rates[id] == -1)
    throw new Error("You have already rate this book with the opposite rate");
}
