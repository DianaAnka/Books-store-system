import axios from "axios";
import { UserProfilePicResponse, UserResponse } from "../types/userTypes";

export const getUserProfile = async (params: {
  page: number;
  limit: number;
}): Promise<UserResponse> => {
  try {
    const { data } = await axios.get("/me", {
      withCredentials: true,
      params,
    });
    return {
      data: {
        userInfo: data.userInfo,
        userBooks: data.books,
        totalPages: data.totalPages,
        totalCount: data.totalCount,
      },
    };
  } catch (error: any) {
    console.log("unAuthorized");
    throw new Error(error);
  }
};

export const updateUserProfilePic = async (
  formData: FormData
): Promise<UserProfilePicResponse> => {
  try {
    const { data } = await axios.put("/updateProfile", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return {
      data: {
        imageUrl: data.imageUrl,
      },
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
