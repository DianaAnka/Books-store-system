import { IComment } from "../types/comment";
import { IUser } from "../types/user";

export namespace Express {
  export interface Request {
    body: {
      comment: IComment;
    };
    cookies: any;
    params: any;
    user?: IUser;
  }
}
