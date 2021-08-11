import { Response } from "express";
import * as e from "../customTypes/authReqCustom";
import userValidate from "../validation/authValidation";
import {
  addNewUser,
  getUserByEmail,
  loginUser,
} from "../services/userService";
import { generateToken } from "../lib/tokenHandler";
import { LoginUserDto, RegisterUserDto } from "../dtoTypes/userDto";

export async function registerController(
  req: e.Express.Request,
  res: Response
) {
  const registerUserDto: RegisterUserDto = req.body;
  try {
    userValidate.validate(registerUserDto);
    const userExisting = await getUserByEmail(registerUserDto.email);
    if (userExisting)
      return res.status(400).json({ message: "Error email exists" });
    await addNewUser(registerUserDto);
    return res.status(200).json({ message: "registered " });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function loginController(req: e.Express.Request, res: Response) {
  const loginUserDto: LoginUserDto = req.body;
  try {
    await loginUser(loginUserDto);
    const token = generateToken(loginUserDto.email);
    res.cookie("token", token, { httpOnly: true }).sendStatus(200);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function isLoggedInController(
  req: e.Express.Request,
  res: Response
) {
  const email = req.email;
  try {
    const user = await getUserByEmail(email!);
    if (!user) return res.status(400).json({ error: "Not logged " });
    return res.status(200).json({ message: "Logged " });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export function logOutController(req: e.Express.Request, res: Response) {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout " });
}
