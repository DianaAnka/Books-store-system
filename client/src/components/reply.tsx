import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      marginBottom: "10vh",
      overflow: "hidden",
      position: "relative",
    },
    commentUl: {
      listStyleType: "none",
    },
    imgStyle: {
      width: theme.spacing(5),
      height: theme.spacing(5),
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
  })
);

const Reply = (props: { comment: IComment }) => {
  const classes = useStyles();

  return (
    <div>
      <img
        className={classes.imgStyle}
        src={props.comment.user.profilePic}
        alt=""
      />
      <div className={classes.commentContainer}>
        <p className={classes.email}>{props.comment.user.email}</p>
        <p className={classes.content}>{props.comment.content}</p>
      </div>
    </div>
  );
};

export default Reply;
