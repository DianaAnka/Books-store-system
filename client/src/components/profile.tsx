import React, { ChangeEvent, useEffect, useState } from "react";
import useStore from "../store";
import { IBook } from "../types/bookTypes";
import { IUser, UserProps } from "../types/userTypes";
import { getUserProfile, updateUserProfilePic } from "../services/userService";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import BookCard from "./bookCard";
import { Pagination } from "@material-ui/lab";

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
      marginTop: "4%",
      height: "90%",
      width: "95%",
      columnCount: 3,
      listStyleType: "none",
    },
    item: {
      height: "100%",
      width: "100%",
    },
    paginatore: {
      marginTop: "20px",
      position: "fixed",
      left: "50%",
      transform: "translate(-50%, 0)",
    },
  })
);

const Profile: React.FC<Props> = (props: any) => {
  const classes = useStyles();
  const [user, setUser] = useState<IUser>();
  const [profilePic, setProfilePic] = useState<string | undefined>(undefined);
  const [userBooks, setUserBooks] = useState<IBook[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const store = useStore((state) => state);
  const pageSizes = [3, 6, 9];

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: any) => {
    setPageSize(event.target?.value);
    setPage(1);
  };

  const getProfileInfo = () => {
    getUserProfile({ page: page, limit: pageSize })
      .then((response) => {
        const data = response.data;
        setUser(data.userInfo);
        setProfilePic(data.userInfo.profilePic);
        setUserBooks(data.userBooks);
        setCount(data.totalPages);
      })
      .catch((e) => {
        console.log(e);
        props.history.push("/401");
      });
  };

  const handleUpdateProfilePic = async (e: any) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const email = store.user?.email;
    if (email) formData.append("email", email!);
    const { imageUrl } = await updateUserProfilePic(formData);
    setProfilePic(imageUrl);
  };

  useEffect(() => getProfileInfo(), [page, pageSize]);

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
            onChange={handleUpdateProfilePic}
          />
        </div>
        <div className={classes.profilePicContainer}>
          <img className={classes.large} src={profilePic} alt="img" />
        </div>
      </div>
      <div className={classes.booksContainer}>
        <h1>My Books</h1>
        <div className="mt-3">
          {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <Pagination
            className={classes.paginatore}
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>
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
