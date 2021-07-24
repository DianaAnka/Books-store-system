import React, { useEffect, useState } from "react";
import useStore from "../store";
import { IBook, IUser, UserProps } from "../type";
import { getUserProfile } from "../services/userService";
import { Avatar, createStyles, makeStyles, Theme } from "@material-ui/core";
import BookCard from "./bookCard";

type Props = UserProps;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    userInfoCotainer: {
      height: "50%",
      padding: "20px",
      display: "flex",
    },
    booksContainer: {
      height: "50%",
    },
    profilePicContainer: {
      width: "50%",
      float: "left",
      padding: "20px",
    },
    userEmailContainer: {
      width: "50%",
      float: "right",
      padding: "20px",
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    flexContainer: {
      marginTop: "3%",
      height: "90%",
      width: "90%",
      columnCount: 4,
      listStyleType: "none",
    },
    item: {
      height: "100%",
      width: "100%",
    },
  })
);

const Profile: React.FC<Props> = (props: any) => {
  const classes = useStyles();
  const [user, setUser] = useState<IUser>();
  const [userBooks, setUserBooks] = useState<IBook[]>([]);
  const store = useStore((state) => state);

  const getProfileInfo = () => {
    const params = { email: store.user?.email };
    getUserProfile(params)
      .then((response) => {
        const data = response.data;
        setUser(data.userInfo);
        setUserBooks(data.userBooks);
      })
      .catch((e) => {
        console.log(e);
        props.history.push("/401");
      });
  };
  useEffect(() => getProfileInfo(), []);
  const handlePhoto = (e: any) => {
    console.log("img ", e.target.files[0]);
  };
  return (
    <div>
      <div className={classes.userInfoCotainer}>
        <div className={classes.userEmailContainer}>
          <h1>{user?.email}</h1>
          <label htmlFor="photo">Update Profile Picture</label>
          <br />
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="photo"
            onChange={handlePhoto}
          />
        </div>
        <div className={classes.profilePicContainer}>
          <Avatar className={classes.large} src={user?.profilePic} />
        </div>
      </div>
      <div className={classes.booksContainer}>
        <h1>My Books</h1>
        <ul className={classes.flexContainer}>
          {userBooks &&
            userBooks.map((book, index) => (
              <li className={classes.item} key={index}>
                <BookCard {...book} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
