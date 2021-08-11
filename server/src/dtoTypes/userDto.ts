import { ObjectId } from "mongoose";

export interface RegisterUserDto {
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface UpdateUserProfilePicDto {
  profilePic: string;
}
