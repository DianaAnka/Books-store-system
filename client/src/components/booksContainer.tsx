import BookCard from "./bookCard";
import { makeStyles } from "@material-ui/core";
import { IBook } from "../types/bookTypes";

const useStyles = makeStyles({
  flexContainer: {
    marginTop: "25vh",
    width: "100%",
    display: "inline-block",
    listStyleType: "none",
    marginLeft: "auto",
    marginRight: "auto",
  },
  item: {
    display: "block",
    height: "10%",
    width: "30%",
    float: "left",
    paddingBottom: "25vh",
    marginRight: "1vh",
  },
});
const BooksContainer = (props: { books?: IBook[] }) => {
  const classes = useStyles();
  
  return (
    <ul className={classes.flexContainer}>
      {props.books &&
        props.books.map((book, index) => (
          <li className={classes.item} key={index}>
            <BookCard {...book} />
          </li>
        ))}
    </ul>
  );
};

export default BooksContainer;
