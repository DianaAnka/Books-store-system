export const handleComments = (comments?: [IComment]) => {
  const parentComments = extractParentComments(comments!);
  const replies = extractReplies(comments!);
  const commentsTree = stickRepliesWithComments(parentComments, replies);
  return commentsTree;
};

export const extractParentComments = (comments: [IComment]) => {
  return comments.filter((comment) => comment.parentId == null);
};

export const extractReplies = (comments: [IComment]) => {
  return comments.filter((comment) => comment.parentId != null);
};

export const stickRepliesWithComments = (
  parentComments: IComment[],
  replies: IComment[]
) => {
  let commentsTree: CommentTree[] = [];
  parentComments.forEach((comment) => {
    let commentReplies: IComment[] = [];
    replies.forEach((reply) => {
      if (reply.parentId === comment._id) commentReplies.push(reply);
    });
    commentsTree.push({ comment, replies: commentReplies });
  });
  return commentsTree;
};
