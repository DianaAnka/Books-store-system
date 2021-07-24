import axios, { AxiosResponse } from "axios";
import { userApiDataType } from "../type";

export const getUserProfile = async (params: {
  email?: string;
}): Promise<AxiosResponse<userApiDataType>> => {
  try {
    const user: AxiosResponse<userApiDataType> = await axios.get("/me", {
      withCredentials: true,
      params,
    });
    return user;
  } catch (error: any) {
    console.log("unAuthorized");
    throw new Error(error);
  }
};

export const updateUserProfilePic = async (
  params: {
    email?: string;
  },
  data: { profilePic: any }
): Promise<AxiosResponse<userApiDataType>> => {
  try {
    const user: AxiosResponse<userApiDataType> = await axios.put(
      "/updateProfile",
      { data },
      {
        withCredentials: true,
        params,
      }
    );
    return user;
  } catch (error: any) {
    console.log("unAuthorized");
    throw new Error(error);
  }
};
