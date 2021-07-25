export namespace Express {
  export interface Request {
    cookies: any;
    body: any;
    header: any;
    email?: string;
    password?: string;
    query: any;
    file?: any;
  }
}
