import jwt from "jsonwebtoken";
import config from "../../config";

export function generateToken(email: string) {
  const payload = { email };
  const token = jwt.sign(payload, config.API_KEY as string, {
    expiresIn: "24h",
  });
  return token;
}
