interface IsLoggedResponse extends AxiosResponse {
  data: boolean;
  error: Error;
}

interface LogoutResponse extends AxiosResponse {
  data: boolean;
  error: Error;
}
