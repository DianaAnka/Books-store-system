import { ObjectId } from "mongoose";

export interface SearchedBookDto {
  page: number;
  limit: number;
  anyField: string;
  author: string;
  title: string;
  abstract: string;
}

export interface UserBookDto {
  page: number;
  limit: number;
  userId: ObjectId;
}
