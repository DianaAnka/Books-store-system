import {
  Box,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  useMediaQuery,
} from "@material-ui/core";
import React from "react";
import BookCard from "./bookCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: 25,
      width: "100%",
      marginRight: "auto",
      marginLeft: "auto",
      padding: "0 auto 0 auto",
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
      backgroundColor: "#e5e2e2",
      width: "190px",
      height: "auto",
      display: "inline-block",
      justifyContent: "center",
    },
    row: {
      float: "left",
    },
  })
);

interface BooksContainerProps {
  books: GetBookDTO[];
}

const BooksContainer = (props: BooksContainerProps) => {
  const matches = useMediaQuery("(min-width:500px)");
  const classes = useStyles();

  function FormRow(props: { books: GetBookDTO[] }) {
    return (
      <React.Fragment>
        <Grid container item lg={2}> {props.books &&
          props.books.map((book, index) => (
            <Paper
              elevation={0}
              style={{ margin: matches ? "1% 15px" : "0 auto" }}
              className={classes.paper}
            >
              <BookCard book={book} />
            </Paper>
          ))}</Grid>
       
      </React.Fragment>
    );
  }
  return (
    <>
      <Box display="flex" justifyContent="center">
        <div className={classes.root}>
          <Grid container spacing={2}>
            {/* <Grid container item className={classes.row}>
              <FormRow books={props.books.slice(0, 5)} />
            </Grid>
            <Grid container item className={classes.row}>
              <FormRow books={props.books.slice(5, 10)} />
            </Grid>
            <Grid container item className={classes.row}>
              <FormRow books={props.books.slice(10, 15)} />
            </Grid> */}
            {props.books.map((book) => <Grid item lg={2}>
              <Paper
              elevation={0}
              style={{ margin: matches ? "1% 15px" : "0 auto" }}
              className={classes.paper}
            >
              <BookCard book={book} />
            </Paper>
            </Grid>)}
          </Grid>
        </div>
      </Box>
    </>
  );
};

export default BooksContainer;
