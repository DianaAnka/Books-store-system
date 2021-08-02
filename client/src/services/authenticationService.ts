import axios, { AxiosResponse } from "axios";
import { IUser } from "../types/userTypes";

export const isLogged = async (): Promise<AxiosResponse<IUser>> => {
  try {
    const user: AxiosResponse<IUser> = await axios.get("/api/isLoggedIn", {
      withCredentials: true,
    });
    return user;
  } catch (error: any) {
    console.log("error is ", error);
    throw new Error(error);
  }
};

export const logout = async (): Promise<AxiosResponse> => {
  try {
    const data: AxiosResponse = await axios.put(
      "/api/logout",
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error: any) {
    console.log("error is ", error);
    throw new Error(error);
  }
};
