import { ObjectId } from "mongoose";

export interface RegisterUserDTO {
  email: string;
  password: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface UpdateUserProfilePicDTO {
  profilePic: string;
}
