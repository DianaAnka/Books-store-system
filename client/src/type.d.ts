interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  profilePic: string;
  roles: [string];
  rates: [Map<string, number>];
  createdAt?: string;
  updatedAt?: string;
}

interface UserProps {
  user: IUser;
}
export interface IBook {
  title: string;
  author: string;
  tags: [string];
}

type ApiDataType = {
  message: string;
  status: string;
  users: IUser[];
  user?: IUser;
};

type BooksApiDataType = {
  books: [IBook];
  totalPages: number;
};

type userApiDataType = {
  userInfo: IUser;

  userBooks: [IBook];
};
