export namespace Express {
  export interface Request {
    body: any;
    cookies: any;
    email?: string;
    password?: string;
  }
}
