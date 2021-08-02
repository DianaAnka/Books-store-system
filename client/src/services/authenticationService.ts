import axios, { AxiosResponse } from "axios";

export const isLogged = async (): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.get("/api/isLoggedIn", {
      withCredentials: true,
    });
    return res;
  } catch (error: any) {
    console.log("error is ", error);
    throw new Error(error);
  }
};

export const logout = async (): Promise<AxiosResponse> => {
  try {
    const data: AxiosResponse = await axios.put("/api/logout", {
      withCredentials: true,
    });
    return data;
  } catch (error: any) {
    console.log("error is ", error);
    throw new Error(error);
  }
};
