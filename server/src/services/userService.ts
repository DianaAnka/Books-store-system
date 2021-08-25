import { ObjectId } from "mongoose";
import {
  LoginUserDTO,
  RegisterUserDTO,
  UpdateUserProfilePicDTO,
} from "../dtoTypes/userDTO";
import { isCorrectPassword } from "../lib/bcryptHandler";
import User from "../models/user";
import { IUser } from "../types/user";

export async function getUserByEmail(email: string) {
  return await User.findOne({ email: email }).exec();
}

export async function addNewUser(userDTO: RegisterUserDTO) {
  const user = new User(userDTO);
  await user.save();
}

export async function loginUser(data: LoginUserDTO) {
  const user = await getUserByEmail(data.email);
  if (!user) throw new Error("Incorrect email or password");
  if (!(await isCorrectPassword(data.password, user)))
    throw new Error("Incorrect email or password");
}

export async function updateUserByEmail(
  email: string,
  updatedUserDTO: UpdateUserProfilePicDTO
) {
  const user = await User.findOneAndUpdate({ email }, updatedUserDTO).exec();
  return user;
}

export async function checkDuplicateEmail(email: string) {
  const userExisting = await getUserByEmail(email);
  if (userExisting) throw new Error("Error email exists");
}

export async function updateUserRate(user: IUser, id: string, rate: number) {
  await User.updateOne({ _id: user.id }, { $set: { [`rates.${id}`]: rate } });
}
