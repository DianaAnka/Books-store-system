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
