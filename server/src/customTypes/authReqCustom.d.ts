export namespace Express {
  export interface Request {
    method: any;
    cookies: any;
    body: any;
    header: any;
    email?: string;
    password?: string;
    query: any;
    file?: any;
    params: any;
    user?: IUser;
  }
}
