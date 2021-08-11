import * as express from "express";
import * as e from "../customTypes/authReqCustom";
import { getEmailFromToken } from "../lib/tokenHandler";

const getUserIdentity = function (
  req: e.Express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  try {
    req.email = getEmailFromToken(token);
    next();
  } catch (err: any) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid token " });
  }
};
export default getUserIdentity;
