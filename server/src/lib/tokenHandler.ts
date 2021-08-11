import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

export function generateToken(email: string) {
  const payload = { email };
  const token = jwt.sign(payload, config.API_KEY as string, {
    expiresIn: "24h",
  });
  return token;
}

export function getEmailFromToken(token:string){
  const decoded = jwt.verify(token, config.API_KEY) as JwtPayload;
  return decoded.email;
}
