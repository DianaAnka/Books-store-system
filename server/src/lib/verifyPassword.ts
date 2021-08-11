import { IUser } from "../types/user";
import * as bcrypt from "bcrypt";

export async function isCorrectPassword(password: string, user: IUser) {
  return bcrypt.compare(password, user.password);
}
