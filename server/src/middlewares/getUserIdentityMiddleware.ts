import * as express from "express";
import * as e from "../customTypes/authReqCustom";
import { decodeToken } from "../lib/tokenHandler";
import { getUserByEmail } from "../services/userService";

const getUserIdentity = async function (
  req: e.Express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  try {
    const email = decodeToken(token).email;
    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json({ error: "User not found" });
    req.user = user;
    next();
  } catch (err: any) {
    return res.status(401).json({ error: "Unauthorized: Invalid token " });
  }
};
export default getUserIdentity;
