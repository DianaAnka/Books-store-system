import AxiosAPIResponse from "./generalTypes";
interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  profilePic: string;
  roles: [string];
  rates: Map<string, number>;
  createdAt?: string;
  updatedAt?: string;
}

interface UserProps {
  user: IUser;
}

interface UserResponse extends AxiosAPIResponse {
  data?: {
    userInfo: IUser;
    userBooks: [IBook];
    totalPages: number;
    totalCount: number;
  };
}

interface UserProfilePicResponse extends AxiosAPIResponse {
  data?: { imageUrl: string };
}
