import axios from "axios";
import {
  AddBookResponse,
  GetBooksResponse,
  IAddBook,
} from "../types/bookTypes";

export const getBooks = async (params: {
  page: number;
  limit: number;
  anyField?: string;
  author?: string;
  title?: string;
  abstract?: string;
}): Promise<GetBooksResponse> => {
  try {
    return await axios.get("/books", {
      params,
    });
  } catch (error: any) {
    throw new Error("Error ");
  }
};

export const addBook = async (book: IAddBook): Promise<AddBookResponse> => {
  try {
    return await axios.post("/book", { book }, { withCredentials: true });
  } catch (error: any) {
    throw new Error("Error ");
  }
};
