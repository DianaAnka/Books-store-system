import { Response } from "express";
import { IUser } from "../types/user";
import User from "../models/user";
import { CallbackError } from "mongoose";
import * as e from "../customTypes/authReqCustom";
import jwt from "jsonwebtoken";
import config from "../../config";
import * as validate from "../validation/authValidation";

function addNewUser(res: Response, email: string, password: string) {
  const user = new User({ email, password });
  User.findOne(
    { email: user.email },
    function (err: Error, userExisting: IUser) {
      if (userExisting) {
        return res.status(400).json({ error: "Error email exists" });
      }
      user.save(function (err: CallbackError) {
        if (err) {
          res
            .status(500)
            .json({ error: "Error registering new user please try again." });
        } else {
          res.status(200).json({ meassage: "registration is complete" });
        }
      });
    }
  );
}

export function register(req: e.Express.Request, res: Response) {
  const { email, password } = req.body;
  try {
    validate.default.validate({ email: email, password: password });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
  addNewUser(res, email, password);
}

export function login(req: e.Express.Request, res: Response) {
  const { email, password } = req.body;
  User.findOne({ email }, function (err: Error, user: IUser) {
    if (err) {
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password",
      });
    } else {
      user.isCorrectPassword(password, function (err: Error, same: boolean) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password",
          });
        } else {
          const payload = { email };
          const token = jwt.sign(payload, config.API_KEY as string, {
            expiresIn: "24h",
          });
          res.cookie("token", token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
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
  res.clearCookie("token")
  res.status(200).json({ message: "Logout " });
}
