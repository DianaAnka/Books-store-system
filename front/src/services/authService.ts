import axios from "axios";

export const login = (loginDTO: LoginDTO): Promise<LoginResponse> => {
  return axios.post("/login", { loginDTO });
};

export const register = (
  registerDTO: RegisterDTO
): Promise<RegisterResponse> => {
  return axios.post("/register", { registerDTO });
};

export const getUser = (): Promise<GetUserResponse> => {
  return axios.get("/users/me", { withCredentials: true });
};
