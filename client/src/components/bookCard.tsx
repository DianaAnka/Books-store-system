import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import useStore from "../store";
import { IBook } from "../types/bookTypes";
import { useHistory } from "react-router-dom";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import AppBarMenu from "./AppBar";

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
    history.push({
      pathname: "/bookPage",
      state: {
        data: props,
      },
    });
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={`https://picsum.photos/200/300?x=${Math.random()}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography component="p">{props.author}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={openBookPage}>
          Show More
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
