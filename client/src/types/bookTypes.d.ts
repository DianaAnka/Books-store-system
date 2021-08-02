export interface IBook {
  title: string;
  author: string;
  tags?: string[];
  abstract?: string;
  content?: string;
}

type BooksApiDataType = {
  books: IBook[];
  totalPages: number;
};

type SearchQuery = {
  operand?: string;
  params?: [{ title?: string }, { author?: string }, { abstract?: string }];
};

type QueryParams = {
  title?: string;
  author?: string;
  abstract?: string;
};
