export interface AxiosAPIResponse {
  data?: any;
  error?: Error;
}

export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Error ";
  }
}
