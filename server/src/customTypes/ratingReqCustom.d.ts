export namespace Express {
  export interface Request {
    body: any;
    cookies: any;
    params: any;
    user?: IUser;
  }
}
