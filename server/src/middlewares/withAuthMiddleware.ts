import * as express from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import config from "../../config";

const withAuth = function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
  } else {
    jwt.verify(
      token,
      config.API_KEY as string,
      (err: VerifyErrors | null, decoded?: JwtPayload) => {
        if (err) {
          res.status(401).json({ error: "Unauthorized: Invalid token" });
        } else {
          if (decoded) req.email = decoded.email;
          next();
        }
      }
    );
  }
};
export default withAuth;
