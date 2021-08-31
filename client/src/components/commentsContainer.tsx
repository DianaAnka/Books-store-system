import Comment from "./comment";
import TextField from "@material-ui/core/TextField";
import { Button, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { addComment } from "../services/commentsService";
import { useSnackbar } from "notistack";

const useStyles = makeStyles({
  commentUl: {
    listStyleType: "none",
    right: 0,
    top: 0,
    float: "left",
  },
  submitButton: {
    float: "left",
  },
});

const CommentsContainer = (props: {
  commentsTree?: CommentTree[];
  bookId: string;
  onChange: () => void;
}) => {
  const [commentContent, setCommentContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const handleAddComment = async () => {
    const comment: CommentDTO = { content: commentContent, parentId: null };
    try {
      await addComment(props.bookId, comment);
      enqueueSnackbar("Adding Comment is Complete");
      setCommentContent("");
      props.onChange();
    } catch (error: any) {
      enqueueSnackbar(error.message);
    }
  };
  function handleChange() {
    props.onChange();
  }

  return (
    <div>
      <TextField
        variant="outlined"
        fullWidth
        type="text"
        value={commentContent}
        placeholder="Add Comment"
        margin="normal"
        helperText={titleError}
        error={titleError ? true : false}
        onChange={({ target }) => {
          if (target.value.trim().length > 30)
            setTitleError("Comment length must be eaual or less than 30");
          else setTitleError("");
          setCommentContent(target.value.trim());
        }}
      />
      <Button
        color="primary"
        className={classes.submitButton}
        disabled={commentContent.length === 0 || commentContent.length > 30}
        onClick={handleAddComment}
      >
        Submit{" "}
      </Button>
      <h3>Comments</h3>
      <hr />
      <ul className={classes.commentUl}>
        {" "}
        {props.commentsTree &&
          props.commentsTree.map((comment, index) => (
            <li key={index}>
              <Comment
                commentTree={comment}
                bookId={props.bookId}
                onChange={handleChange}
              />
              <hr />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CommentsContainer;
