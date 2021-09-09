import { createStyles, makeStyles, Theme } from "@material-ui/core";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import useStore from "../store";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { useEffect, useState } from "react";
import { addDislike, addLike, getBook } from "../services/booksService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      width: "100%",
    },
    text: {
      color: "#999999",
      textTransform: "capitalize",
      textAlign: "center",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20px",
      letterSpacing: "0.6px",
      marginTop: 0,
      marginBottom: "4px",
      textOverflow: "ellipsis",
      width: "100%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      clear: "both",
    },
    root: {
      backgroundColor: "#e5e2e2",
    },
    likesCount: {
      color: "#000000",
      display: "block",
      verticalAlign: "middle",
      margin: "0px 0 5px",
      fontSize: "18px",
      fontWeight: 700,
      lineHeight: "26px",
      letterSpacing: "0.2px",
    },
    icon: {
      width: "100%",
      color: "#999999",
    },
    button: {
      width: "40px",
      height: "40px",
      color: "#999999",
      padding: "7px 8px",
      textAlign: "center",
      textTransform: "uppercase",
      position: "relative",
      transition: "none",
      verticalAlign: "middle",
      backgroundColor: "transparent",
      opacity: 1,
      border: 0,
      margin: "0 2%",
    },
    buttonsGroup: {
      position: "relative",
      width: "100%",
      zIndex: 9,
      textAlign: "center",
      borderTop: "1px solid #cbc9c9",
      marginTop: "10px",
      paddingTop: "10px",
      opacity: 1,
    },
    title: {
      fontFamily: "'Roboto Slab', serif",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
  })
);

interface BookCardProps {
  book: GetBookDTO;
}

const BookCard = (props: BookCardProps) => {
  const classes = useStyles();
  const store = useStore((state) => state);
  const [book, setBook] = useState<GetBookDTO>(props.book);
  const [userRate, setUserRate] = useState(0);

  const handleLike = async () => {
    try {
      await addLike(props.book._id);
      setUserRate(userRate === 1 ? 0 : 1);
    } catch (error: any) {}
  };

  const handleDislike = async () => {
    try {
      await addDislike(props.book._id);
      setUserRate(userRate === -1 ? 0 : -1);
    } catch (error: any) {}
  };

  function getRandomBookCover(): string {
    const index = Math.ceil(Math.random() * 20);
    return `https://www.itsoftera.com/opencart/opc02/038/lights/image/cache/catalog/product/${index}-495x731.jpg`;
  }
  useEffect(() => {
    if (store.user?.rates)
      Object.keys(store.user?.rates).forEach((key) => {
        if (key === props.book._id) setUserRate(store.user?.rates[key]);
      });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { book } = (await getBook(props.book._id)).data;
        setBook(book);
      } catch (error) {}
    })();
  }, [userRate]);

  return (
    <>
      <div className={classes.root}>
        <img className={classes.img} src={getRandomBookCover()} alt="" />
        <div className={classes.text}>
          <p className={classes.title}>{book.title}</p>
        </div>
        <div>
          <p className={classes.likesCount}>
            {book.likesCount} <FontAwesomeIcon icon={["far", "smile"]} />
          </p>
          <div className={classes.buttonsGroup}>
            <>
              <button
                className={classes.button}
                onClick={handleLike}
                disabled={!store.user?.isLogged}
              >
                <ThumbUpAltIcon color={userRate === 1 ? "error" : "disabled"} />
              </button>
              <button
                className={classes.button}
                onClick={handleDislike}
                disabled={!store.user?.isLogged}
              >
                <ThumbDownIcon color={userRate === -1 ? "error" : "disabled"} />
              </button>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCard;
