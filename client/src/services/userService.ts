import axios, { AxiosResponse } from "axios";
import { userApiDataType, userApiProfilePic } from "../types/userTypes";

export const getUserProfile = async (params:{
  page: number;
  limit: number;
}): Promise<AxiosResponse<userApiDataType>> => {
  try {
    const user: AxiosResponse<userApiDataType> = await axios.get("/me", {
      withCredentials: true,
      params
    });
    return user;
  } catch (error: any) {
    console.log("unAuthorized");
    throw new Error(error);
  }
};

export const updateUserProfilePic = async (
  formData: FormData
): Promise<userApiProfilePic> => {
  try {
    const { data } = await axios.put("/updateProfile", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { imageUrl: data.imageUrl };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
