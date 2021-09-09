import axios from "axios";

export const getBooks = (params: {
  page: number;
  limit: number;
  anyField?: string;
  author?: string;
  title?: string;
  abstract?: string;
}): Promise<GetBooksResponse> => {
  return axios.get("/books", {
    params,
  });
};

export const getBook = (bookId: string): Promise<GetBookResponse> => {
  return axios.get(`/books/${bookId}`);
};

export const addLike = (bookId: string): Promise<PutRateResponse> => {
  return axios.put(`/books/${bookId}/like`, { withCredentials: true });
};

export const addDislike = (bookId: string): Promise<PutRateResponse> => {
  return axios.put(`/books/${bookId}/dislike`, { withCredentials: true });
};
