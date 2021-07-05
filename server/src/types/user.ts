import { Document } from "mongoose";

export interface IUser extends Document {
  isCorrectPassword(
    password: string,
    arg1: (err: Error, same: boolean) => void
  ): any;
  name: string;
  email: string;
  password: string;
  profilePic: string;
  roles: [string];
  rates: Map<string, number>;
}
