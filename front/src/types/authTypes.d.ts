interface LoginDTO {
  email: string;
  password: string;
}

interface RegisterDTO {
  email: string;
  password: string;
}

interface Response<TData, TError = Error> {
  data: TData;
  error: TError;
}

interface LoginResponse extends Response<{ response: boolean }> {}

interface RegisterResponse extends Response<{ response: boolean }> {}

interface GetUserResponse
  extends Response<{
    user: { email: string; profilePic: string; rates: any };
  }> {}

interface LogoutResponse extends Response<{ response: boolean }> {}
