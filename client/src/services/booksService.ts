import axios from "axios";
import { BooksApiDataType } from "../types/bookTypes";

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
  };
};
