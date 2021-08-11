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
import { WithContext as ReactTags } from "react-tag-input";
import { Tag } from "react-tag-input";
import "../App.css";
import AppBarMenu from "./AppBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 500,
      margin: `${theme.spacing(0)} auto`,
      marginBottom: "10%",
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
    tagLabel: {
      float: "left",
      color: "#7575a1",
    },
  })
);

const AddBookForm = (props: any) => {
  const [book, setBook] = useState<IBook>({ title: "", author: "" });
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const validateBook = (book: IBook) => {
    if (book.title.length < 1) {
      setTitleError("Title is Required");
      setAuthorError("");
      if (book.author.length < 1) setAuthorError("Author is Required");
      return false;
    }
    if (book.author.length < 1) {
      setAuthorError("Author is Required");
      setTitleError("");
      return false;
    }
    return true;
  };

  const handleAddBook = async () => {
    const bookToAdd = { ...book, tags: tags.map((tag) => tag.text) };

    if (!validateBook(book)) return;
    try {
      await addBook(bookToAdd);
      enqueueSnackbar("Adding Book is Complete");
      history.push("/me");
    } catch (e) {
      enqueueSnackbar("Couldn't Add the book, Book already exists");
    }
  };

  const handleTagDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleTagAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  return (
    <>
      <AppBarMenu inLoginRoute={false}></AppBarMenu>
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
                helperText={titleError}
                error={titleError ? true : false}
                required
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
                helperText={authorError}
                error={authorError ? true : false}
                required
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
                multiline
                rows={2}
                rowsMax={4}
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
                multiline
                rows={4}
                rowsMax={8}
                onChange={({ target }) =>
                  setBook({
                    ...book,
                    content: target.value.trim(),
                  })
                }
              />
              <label className={classes.tagLabel} htmlFor="Tags">
                Tags
              </label>
              <ReactTags
                tags={tags}
                inputFieldPosition="inline"
                inline
                handleDelete={handleTagDelete}
                handleAddition={handleTagAddition}
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
            >
              ADD
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};

export default AddBookForm;
