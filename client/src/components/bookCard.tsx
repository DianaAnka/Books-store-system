import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import useStore from "../store";
import { IBook } from "../type";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const classes = useStyles();
  const store = useStore((state) => state);
  const openBookPage = (e: any) => {
    e.preventDefault();
    if (store.user?.isLogged)
      history.push({
        pathname: "/bookPage",
        state: {
          data: props,
        },
      });
  };
  return (
    <Card className={classes.root} onClick={openBookPage}>
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
