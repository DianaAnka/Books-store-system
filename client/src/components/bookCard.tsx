import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { IBook } from "../type";

const useStyles = makeStyles({
  root: {
    maxWidth: "auto",
    maxHeight: "500px",
    overflow: "auto",
    display: "block",
    background: "lavender",
    marginBottom: "20px",
  },
});

const BookCard = (props: IBook) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Title: {props.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Author : {props.author}
          <br />
          Tags : {props.tags}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
