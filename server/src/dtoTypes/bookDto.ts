import { ObjectId } from "mongoose";

export interface GetBooksDTO {
  page: number;
  limit: number;
  anyField: string;
  author: string;
  title: string;
  abstract: string;
}

export interface UserBookDTO {
  page: number;
  limit: number;
  userId: ObjectId;
}

export interface AddBookDTO{
  author: string;
  title: string;
  content: string;
  abstract: string;
  tags: string[];
}