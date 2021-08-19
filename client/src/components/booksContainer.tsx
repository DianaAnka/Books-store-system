import BookCard from "./bookCard";
import { makeStyles } from "@material-ui/core";
import { IBook } from "../types/bookTypes";

const useStyles = makeStyles({
  flexContainer: {
    marginTop: "8%",
    width: "70%",
    columnCount: 3,
    listStyleType: "none",
    marginLeft: "auto",
    marginRight: "auto",
  },
  item: {
    height: "80vh",
    width: "100%",
    paddingBottom: "25vh",
  },
});
const BooksContainer = (props: { books: IBook[] }) => {
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
