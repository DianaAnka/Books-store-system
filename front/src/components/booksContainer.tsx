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
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
      backgroundColor: "#e5e2e2",
    },
  })
);

interface BooksContainerProps {
  books: GetBooksDTO[];
}

const BooksContainer = (props: BooksContainerProps) => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");

  function FormRow(props: { book: GetBooksDTO }) {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.paper}>
            <BookCard book={props.book} />
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
  return (
    <>
      <Box display="flex" justifyContent="center">
        <div className={classes.root}>
          <Grid container spacing={2}>
            {props.books &&
              props.books.map((book, index) => (
                <Grid container item xs={matches ? 4 : 12} spacing={0}>
                  <FormRow book={book} />
                </Grid>
              ))}
          </Grid>
        </div>
      </Box>
    </>
  );
};

export default BooksContainer;
