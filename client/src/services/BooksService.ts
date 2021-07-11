import axios, { AxiosResponse } from "axios";

export const getBooks = async (params: {
  page: number;
  limit: number;
}): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const books: AxiosResponse<ApiDataType> = await axios.get("/books", {
      params,
    });
    return books;
  } catch (error: any) {
    throw new Error(error);
  }
};
