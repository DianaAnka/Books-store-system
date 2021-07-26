import axios, { AxiosResponse } from "axios";
import { IUser, userApiDataType } from "../type";

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
  formData: FormData
): Promise<AxiosResponse<any>> => {
  try {
    const image: AxiosResponse<any> = await axios.put(
      "/updateProfile",
      formData,
      {
        withCredentials: true,
        params,
      }
    );
    return image;
  } catch (error: any) {
    console.log("unAuthorized");
    throw new Error(error);
  }
};
