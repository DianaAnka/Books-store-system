interface GetBooksDTO {
  _id: string;
  title: string;
  author: string;
  likesCount: number;
}

interface GetBooksResponse
  extends Response<{
    books: GetBooksDTO[];
    totalPages: number;
    totalCount: number;
  }> {}
