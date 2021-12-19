interface GetBookDTO {
  _id: string;
  title: string;
  author: string;
  likesCount: number;
}

interface GetBooksResponse
  extends Response<{
    books: GetBookDTO[];
    totalPages: number;
    totalCount: number;
  }> {}

interface GetBookResponse
  extends Response<{
    book: GetBookDTO;
  }> {}

interface PutRateResponse extends Response<{ response: boolean }> {}
