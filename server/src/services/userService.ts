import {
  LoginUserDto,
  RegisterUserDto,
  UpdateUserProfilePicDto,
} from "../dtoTypes/userDto";
import { isCorrectPassword } from "../lib/verifyPassword";
import User from "../models/user";

export function findUserByEmail(email: string) {
  return User.findOne({ email: email }).exec();
}

export async function addNewUser(userDto: RegisterUserDto) {
  const user = new User(userDto);
  await user.save();
}

export async function loginUser(data: LoginUserDto) {
  const user = await findUserByEmail(data.email);
  if (!user) throw new Error("Incorrect email or password");
  if (!(await isCorrectPassword(data.password, user)))
    throw new Error("Incorrect email or password");
}

export async function updateUserByEmail(
  email: string,
  updatedUserDto: UpdateUserProfilePicDto
) {
  const user = await User.findOneAndUpdate({ email }, updatedUserDto).exec();
  return user;
}
