import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { IBook } from "../types/bookTypes";

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "auto",
    background: "lavender",
    marginBottom: 20,
    whiteSpace: "nowrap",
    overflow: "auto",
    textOverflow: "ellipsis",
  },
  media: {
    height: "25vh",
    width: "100%",
  },
});

const BookCard = (props: IBook) => {
  const history = useHistory();
  const classes = useStyles();

  const openBookPage = (e: any) => {
    e.preventDefault();
    history.push({
      pathname: "/bookPage",
      state: {
        book: props,
      },
    });
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Contemplative Reptile"
          image={`https://picsum.photos/200/300?x=${Math.random()}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
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
