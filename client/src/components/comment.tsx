import Reply from "./reply";
import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { useState } from "react";
import { addComment } from "../services/commentsService";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      marginBottom: "10vh",
      overflow: "hidden",
      position: "relative",
      textAlign: "left",
    },
    commentUl: {
      listStyleType: "none",
    },
    imgStyle: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      float: "left",
      position: "relative",
    },
    commentContainer: {
      border: "1px solid #eee",
      marginBottom: "5vh",
      marginRight: 0,
      position: "relative",
      padding: "10px 20px",
      borderRadius: "4px",
      background: "white",
      marginLeft: "85px",
      fontSize: "1em",
    },
    content: {
      display: "block",
    },
    email: {
      paddingBottom: "8px",
      marginBottom: "10px !important",
      borderBottom: "1px solid #eee",
    },
    submitButton: {
      float: "left",
    },
  })
);

const Comment = (props: {
  commentTree: CommentTree;
  bookId: string;
  onChange: () => void;
}) => {
  const [commentContent, setCommentContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const handleAddReply = async () => {
    const comment: CommentDTO = {
      content: commentContent,
      parentId: props.commentTree.comment._id,
    };
    try {
      await addComment(props.bookId, comment);
      enqueueSnackbar("Adding Comment is Complete");
      setCommentContent("");
      props.onChange();
    } catch (error: any) {
      enqueueSnackbar(error.message);
    }
  };

  return (
    <div className={classes.container}>
      <img
        className={classes.imgStyle}
        src={props.commentTree.comment.user.profilePic}
        alt=""
      />
      <div className={classes.commentContainer}>
        <p className={classes.email}>{props.commentTree.comment.user.email}</p>
        <p className={classes.content}>{props.commentTree.comment.content}</p>
      </div>
      <div>
        <ul className={classes.commentUl}>
          {" "}
          {props.commentTree.replies &&
            props.commentTree.replies.map((reply, index) => (
              <li key={index}>
                <Reply comment={reply} />
              </li>
            ))}
          <TextField
            variant="outlined"
            fullWidth
            type="text"
            placeholder="Add Reply"
            margin="normal"
            value={commentContent}
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
            onClick={handleAddReply}
          >
            Submit{" "}
          </Button>
        </ul>
      </div>
    </div>
  );
};

export default Comment;
