import { ObjectId } from "mongoose";

export interface RegisterUserDTO {
  email: string;
  password: string;
  rates: Map<String, Boolean>;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface UpdateUserProfilePicDTO {
  profilePic: string;
}
