import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: "auto",
    maxHeight: "500px",
    overflow: "auto",
    display: "block",
    background: "bisque",
    marginTop: "200px",
  },
});

const BookPage = (props: any) => {
  const data = props.location.state.data;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Title: {data.title}</h1>
      <h2>Author : {data.author}</h2>
    </div>
  );
};

export default BookPage;
