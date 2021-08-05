import { UserDto } from "../dtoTypes/userDto";
import { isCorrectPassword } from "../lib/verifyPassword";
import User from "../models/user";

export async function findUserByEmail(email: string) {
  try {
    const user = await User.findOne({ email: email }).exec();
    return user;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function addNewUser(email: string, password: string) {
  const user = new User({ email, password });
  try {
    const userExisting = await findUserByEmail(email);
    if (userExisting) throw new Error("Error email exists");
    await user.save();
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function loginUser(data: UserDto) {
  try {
    const user = await findUserByEmail(data.email);
    if (!user) throw new Error("Incorrect email or password");
    if (!await isCorrectPassword(data.password, user))
      throw new Error("Incorrect email or password");
  } catch (err: any) {
    throw new Error(err.message);
  }
}
