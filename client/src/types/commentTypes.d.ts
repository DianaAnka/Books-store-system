interface IComment {
  _id: string;
  content: string;
  user: {
    userId: string;
    email: string;
    profilePic?: string;
  };
  parentId: string;
}

interface GetCommentsResponse extends AxiosAPIResponse {
  data?: { comments: [IComment] };
}

interface CommentTree {
  comment: IComment;
  replies: IComment[];
}

interface AddCommentsResponse extends AxiosAPIResponse {
  data?: { res: boolean };
}

interface CommentDTO {
  content: string;
  parentId: ObjectId;
}
