import axios from "axios";

export const getComments = async (
  bookId: string
): Promise<GetCommentsResponse> => {
  try {
    return await axios.get(`/book/${bookId}/comments`);
  } catch (error: any) {
    throw new Error("Error ");
  }
};

export const addComment = async (
  bookId: string,
  comment: CommentDTO
): Promise<AddCommentsResponse> => {
  try {
    return await axios.post(
      `/book/${bookId}/comment`,
      { comment },
      { withCredentials: true }
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};
