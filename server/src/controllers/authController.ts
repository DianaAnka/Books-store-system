import { Response } from "express";
import { IUser } from "../types/user";
import User from "../models/user";
import * as e from "../customTypes/authReqCustom";
import * as validate from "../validation/authValidation";
import { addNewUser, loginUser } from "../services/userService";
import { generateToken } from "../lib/generateToken";

export async function register(req: e.Express.Request, res: Response) {
  const { email, password } = req.body;
  try {
    validate.default.validate({ email: email, password: password });
    await addNewUser(email, password);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function login(req: e.Express.Request, res: Response) {
  const { email, password } = req.body;
  try {
    await loginUser({ email, password });
    const token = generateToken(email);
    res.cookie("token", token, { httpOnly: true }).sendStatus(200);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export function isLoggedIn(req: e.Express.Request, res: Response) {
  const email = req.email;
  User.findOne({ email }, function (err: Error, user: IUser) {
    if (err) {
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(401).json({
        error: "Not logged in",
      });
    } else {
      res.status(200).json({ message: "Logged " });
    }
  });
}

export function logOut(req: e.Express.Request, res: Response) {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout " });
}
