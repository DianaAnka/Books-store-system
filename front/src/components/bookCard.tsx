import { createStyles, makeStyles, Theme } from "@material-ui/core";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import useStore from "../store";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { useEffect, useState } from "react";

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
      fontFamily: "'Roboto Slab', serif",
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
  })
);

interface BookCardProps {
  book: GetBooksDTO;
}

const BookCard = (props: BookCardProps) => {
  const classes = useStyles();
  const store = useStore((state) => state);
  const [userRate, setUserRate] = useState(0);

  useEffect(() => {
    console.log(typeof store.user?.rates);
    if (store.user?.rates)
      Object.keys(store.user?.rates).forEach((key) => {
        console.log("key ", key);
        if (key === props.book._id) setUserRate(store.user?.rates[key]);
      });
  }, []);

  return (
    <>
      <div className={classes.root}>
        <img
          className={classes.img}
          src={`https://picsum.photos/200?x=${Math.random()}`}
          alt=""
        />
        <div className={classes.text}>
          <p>{props.book.title}</p>
        </div>
        <div>
          <p className={classes.likesCount}>{props.book.likesCount}</p>
          {store.user?.isLogged ? (
            <div className={classes.buttonsGroup}>
              <button className={classes.button}>
                <ThumbUpAltIcon color={userRate === 1 ? "error" : "disabled"} />
              </button>
              <button className={classes.button}>
                <ThumbDownIcon color={userRate === -1 ? "error" : "disabled"} />
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default BookCard;
