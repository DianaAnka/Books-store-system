import { Response, Request } from "express";
import userValidate from "../validation/authValidation";
import {
  addNewUser,
  checkDuplicateEmail,
  loginUser,
} from "../services/userService";
import { generateToken } from "../lib/tokenHandler";
import { LoginUserDTO, RegisterUserDTO } from "../dtoTypes/userDTO";

export async function registerController(req: Request, res: Response) {
  const registerUserDTO: RegisterUserDTO = req.body;
  try {
    userValidate.validate(registerUserDTO);
    checkDuplicateEmail(registerUserDTO.email);
    await addNewUser(registerUserDTO);
    return res.status(200).json({ message: "registered " });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function loginController(req: Request, res: Response) {
  const loginUserDTO: LoginUserDTO = req.body;
  try {
    await loginUser(loginUserDTO);
    const token = generateToken(loginUserDTO.email);
    res.cookie("token", token, { httpOnly: true }).sendStatus(200);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function isLoggedInController(req: Request, res: Response) {
  return res.status(200).json({ message: "Logged " });
}

export function logOutController(req: Request, res: Response) {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout " });
}
