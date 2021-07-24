import axios, { AxiosResponse } from "axios";
import { BooksApiDataType } from "../type";

export const getBooks = async (params: {
  page: number;
  limit: number;
}): Promise<AxiosResponse<BooksApiDataType>> => {
  try {
    const books: AxiosResponse<BooksApiDataType> = await axios.get("/books", {
      params,
    });
    return books;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getSearchedBooks = async (params: {
  page: number;
  limit: number;
  searchQuery: string;
}): Promise<AxiosResponse<BooksApiDataType>> => {
  try {
    const books: AxiosResponse<BooksApiDataType> = await axios.get(
      "/searchBooks",
      {
        params,
      }
    );
    return books;
  } catch (error: any) {
    throw new Error(error);
  }
};
