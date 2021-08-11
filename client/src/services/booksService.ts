import axios, { AxiosResponse } from "axios";
import { BooksApiDataType, IBook } from "../types/bookTypes";

export const getBooks = async (params: {
  page: number;
  limit: number;
  anyField?: string;
  author?: string;
  title?: string;
  abstract?: string;
}): Promise<BooksApiDataType> => {
  const { data } = await axios.get("/books", {
    params,
  });
  return {
    books: data.books,
    totalPages: data.totalPages,
    totalCount: data.totalCount,
  };
};

export const addBook = async (book: IBook): Promise<AxiosResponse> => {
  const res = await axios.post(
    "/addBook",
    { book },
    { withCredentials: true }
  );
  return res;
};
