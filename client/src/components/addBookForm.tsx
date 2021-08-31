import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { addBook } from "../services/booksService";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";
import { Tag } from "react-tag-input";
import "../App.css";
import AppBarMenu from "./appBar";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { IAddBook } from "../types/bookTypes";

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
      marginTop: theme.spacing(6),
      flexGrow: 1,
      width: 200,
      backgroundColor: "black",
      color: "white",
      borderRadius: 4,
    },
    header: {
      textAlign: "center",
      width: 450,
    },
    card: {
      marginTop: theme.spacing(10),
    },
    link: {
      textDecoration: "none",
    },
    tagLabel: {
      top: 0,
      left: 0,
      position: "absolute",
      color: "#7575a1",
      fontFamily: "sans-serif",
      transform: "translate(14px, 4px) scale(1)",
      fontSize: "1em",
    },
    root: {
      height: "100vh",
      textAlign: "center",
      verticalAlign: "middle",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: " #d9e4f5",
      backgroundImage: "linear-gradient(315deg, #d9e4f5 0%, #f5e3e6 74%)",
    },
    tagsContainer: {
      marginTop: "16px",
      marginBottom: "8px",
      display: "inline-flex",
      borderRadius: 4,
      border: "1px solid #c4c4c4",
      width: "98%",
      position: "relative",
      flexDirection: "column",
      verticalAlign: "top",
      paddingTop: 25,
      paddingBottom: 12,
      backgroundColor: "#f7f7f7",
    },
    textField: {
      [`& fieldset`]: {
        borderRadius: 4,
      },
      backgroundColor: "#f7f7f7",
      borderRadius: 4,
    },
  })
);

const AddBookForm = (props: any) => {
  const [book, setBook] = useState<IAddBook>({ title: "", author: "" });
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const validateBook = (book: IAddBook) => {
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
    } catch (error: any) {
      enqueueSnackbar(error.message);
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
      <div className={classes.root}>
        <form className={classes.container} noValidate autoComplete="off">
          <div className={classes.header}>
            <h1>Add Book Form</h1>
          </div>
          <div>
            <TextField
              className={classes.textField}
              variant="outlined"
              fullWidth
              id="title"
              type="text"
              label="Title"
              placeholder="Enter Book Title"
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
              className={classes.textField}
              variant="outlined"
              fullWidth
              id="author"
              type="text"
              label="Author"
              placeholder="Enter Book Author"
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
              className={classes.textField}
              variant="outlined"
              fullWidth
              id="abstract"
              type="text"
              label="Abstract"
              placeholder="Enter Book Abstract"
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
              className={classes.textField}
              variant="outlined"
              fullWidth
              id="content"
              type="text"
              label="Content"
              placeholder="Enter Book Content"
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
            <div className={classes.tagsContainer}>
              {" "}
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
          </div>
          <div className={classes.header}>
            <Button
              variant="contained"
              size="large"
              className={classes.loginBtn}
              onClick={handleAddBook}
              endIcon={<ArrowForwardIcon />}
            >
              ADD
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBookForm;
