import { IUser } from "../types/user";
import * as bcrypt from "bcrypt";

export async function isCorrectPassword(password: string, user: IUser) {
  try {
    const match = await bcrypt.compare(password, user.password);
    return match;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
