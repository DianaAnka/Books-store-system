import AxiosAPIResponse from "./generalTypes";
interface IAddBook {
  title: string;
  author: string;
  tags?: string[];
  abstract?: string;
  content?: string;
}

interface IBook {
  _id: string;
  title: string;
  author: string;
  tags?: string[];
  abstract?: string;
  content?: string;
}

interface GetBooksResponse extends AxiosAPIResponse {
  data?: { books: IBook[]; totalPages: number; totalCount: number };
}

type SearchQuery = {
  operand?: string;
  params?: [{ title?: string }, { author?: string }, { abstract?: string }];
};

type QueryParams = {
  title?: string;
  author?: string;
  abstract?: string;
};

interface AddBookResponse extends AxiosAPIResponse {
  data?: boolean;
}
