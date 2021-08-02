import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { IBook } from "../types/bookTypes";
import { useState } from "react";
import { addBook } from "../services/booksService";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      width: 200,
    },
    header: {
      textAlign: "center",
      background: "#212121",
      color: "#fff",
    },
    card: {
      marginTop: theme.spacing(10),
    },
    link: {
      textDecoration: "none",
    },
  })
);

const AddBookFom = (props: any) => {
  const [book, setBook] = useState<IBook>({ title: "", author: "" });
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const handleAddBook = async () => {
    try {
      const res = await addBook(book);
      enqueueSnackbar("Adding Book is Complete");
      history.push("/me");
    } catch (e) {
      enqueueSnackbar("Couldn't Add the book ");
      history.push("/me");
    }
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Add Book" />
        <CardContent>
          <div>
            <TextField
              fullWidth
              id="title"
              type="text"
              label="Title"
              placeholder="Title"
              margin="normal"
              onChange={({ target }) =>
                setBook({
                  ...book,
                  title: target.value.trim(),
                })
              }
            />
            <TextField
              fullWidth
              id="author"
              type="text"
              label="Author"
              placeholder="Author"
              margin="normal"
              onChange={({ target }) =>
                setBook({
                  ...book,
                  author: target.value.trim(),
                })
              }
            />
            <TextField
              fullWidth
              id="abstract"
              type="text"
              label="Abstract"
              placeholder="Abstract"
              margin="normal"
              onChange={({ target }) =>
                setBook({
                  ...book,
                  abstract: target.value.trim(),
                })
              }
            />
            <TextField
              fullWidth
              id="content"
              type="text"
              label="Content"
              placeholder="Content"
              margin="normal"
              onChange={({ target }) =>
                setBook({
                  ...book,
                  content: target.value.trim(),
                })
              }
            />
            <TextField
              fullWidth
              id="tags"
              type="text"
              label="Tags"
              placeholder="Tags"
              margin="normal"
              onChange={({ target }) =>
                setBook({
                  ...book,
                  tags: target.value
                    .replace(/\s+/g, " ")
                    .trim()
                    .split(/[^A-Za-z]/),
                })
              }
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleAddBook}
            disabled={book.title.length < 1 || book.author.length < 1}
          >
            ADD
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default AddBookFom;
