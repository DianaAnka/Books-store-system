import * as express from "express";
import jwt from "jsonwebtoken";
import config from "../../config";

interface MulterRequest extends express.Request {
  email: any;
}
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
      function (err: any, decoded: any) {
        if (err) {
          res.status(401).json({ error: "Unauthorized: Invalid token" });
        } else {
          (req as MulterRequest).email = decoded.email;
          next();
        }
      }
    );
  }
};
export default withAuth;
