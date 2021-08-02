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
      <h4>Abstract: {data.abstract}</h4>
      <h4>Content: {data.content}</h4>
      <h4>
        Tags:{" "}
        {data.tags?.map((tag: string) => (
          <b> {tag}</b>
        ))}
      </h4>
    </div>
  );
};

export default BookPage;
