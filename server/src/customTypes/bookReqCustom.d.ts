export namespace Express {
  export interface Request {
    body: any;
    cookies: any;
    author?: string;
    title?: string;
    userId?: string;
    query: any;
    email?: any;
    searchQuery?: string;
  }
}
