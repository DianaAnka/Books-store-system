import { ObjectId, Schema } from "mongoose";
import Book from "../models/book";
import { IBook } from "../types/book";
import { IUser } from "../types/user";
import { ensureBookExist, getBookById } from "./bookService";
import { updateUserRate } from "./userService";

export async function updateLikesCountOfBookById(id: ObjectId, user: IUser) {
  await ensureBookExist(id);
  const book = await getBookById(id);
  const prevRate = getUserRateByBook(user, id.toString());
  await updateBookLikesCount(prevRate, id, book, user);
}

async function updateBookLikesCount(
  prevRate: any,
  id: Schema.Types.ObjectId,
  book: IBook | null,
  user: IUser
) {
  if (prevRate == -1) {
    await decreaseDislikesCount(id, book!);
    await increaseLikesCount(id, book!);
    await updateUserRate(user, id.toString(), 1);
  } else if (prevRate == 1) {
    await decreaseLikesCount(id, book!);
    await updateUserRate(user, id.toString(), 0);
  } else {
    await increaseLikesCount(id, book!);
    await updateUserRate(user, id.toString(), 1);
  }
}

export async function updateDislikesCountOfBookById(id: ObjectId, user: IUser) {
  await ensureBookExist(id);
  const book = await getBookById(id);
  const prevRate = getUserRateByBook(user, id.toString());
  await updateBookDislikeCount(prevRate, id, book, user);
}

async function updateBookDislikeCount(
  prevRate: any,
  id: Schema.Types.ObjectId,
  book: IBook | null,
  user: IUser
) {
  if (prevRate == 1) {
    await decreaseLikesCount(id, book!);
    await increaseDislikesCount(id, book!);
    await updateUserRate(user, id.toString(), -1);
  } else if (prevRate == -1) {
    await decreaseDislikesCount(id, book!);
    await updateUserRate(user, id.toString(), 0);
  } else {
    await increaseDislikesCount(id, book!);
    await updateUserRate(user, id.toString(), -1);
  }
}

export function increaseLikesCount(id: ObjectId, book: IBook) {
  return Book.findByIdAndUpdate(id, { likesCount: book.likesCount + 1 });
}

export function decreaseLikesCount(id: ObjectId, book: IBook) {
  return Book.findByIdAndUpdate(id, { likesCount: book.likesCount - 1 });
}

export function increaseDislikesCount(id: ObjectId, book: IBook) {
  return Book.findByIdAndUpdate(id, { dislikesCount: book.dislikesCount + 1 });
}

export function decreaseDislikesCount(id: ObjectId, book: IBook) {
  return Book.findByIdAndUpdate(id, { dislikesCount: book.dislikesCount - 1 });
}

export function ensureUserNotRateBook(user: IUser, id: string) {
  return !(id in user.rates && user.rates[id] != 0);
}

export function getUserRateByBook(user: IUser, bookId: string) {
  if (bookId in user.rates) return user.rates[bookId];
  return 0;
}
