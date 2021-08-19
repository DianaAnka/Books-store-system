import { ChangeEvent, useEffect, useState } from "react";
import useStore from "../store";
import { IBook } from "../types/bookTypes";
import { IUser } from "../types/userTypes";
import { getUserProfile, updateUserProfilePic } from "../services/userService";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import BookCard from "./bookCard";
import { Pagination } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AppBarMenu from "./AppBar";
import BooksContainer from "./booksContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    userSection: {
      position: "relative",
      width: "200px",
      height: "200px",
      margin: "10vh auto",
    },
    fileInput: {
      visibility: "hidden",
    },
    userInfoCotainer: {
      width: "60%",
      margin: "10vh auto",
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
    paginatore: {
      marginTop: "20px",
      position: "absolute",
      marginBottom: "20px",
      left: "50%",
      transform: "translate(-50%, 0)",
    },
    addBookLink: {
      textDecoration: "none",
      color: "black",
    },
    addBookBtn: {
      left: "-30%",
      top: "30%",
    },
    userTable: {
      width: "100%",
    },
    addImageIcon: {
      position: "absolute",
      right: "25px",
      fontSize: "2em",
    },
    userUl: {
      position: "relative",
      left: "-20px",
      listStyleType: "none",
    },
    tdContainer: {
      margin: "30px",
      borderRadius: "5px",
      boxShadow: " 0px 6px 16px -6px rgb(1 1 1 / 50%)",
      padding: "30px",
      verticalAlign: "top",
    },
    userLi: {
      padding: "40px 0",
      color: "gray",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
    },
  })
);

const Profile = () => {
  const classes = useStyles();
  const [user, setUser] = useState<IUser>();
  const [profilePic, setProfilePic] = useState<string | undefined>(undefined);
  const [userBooks, setUserBooks] = useState<IBook[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [booksCount, setBooksCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const store = useStore((state) => state);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const pageSizes = [3, 6, 9];

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: any) => {
    setPageSize(event.target?.value);
    setPage(1);
  };

  const handleUpdateProfilePic = async (e: any) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    try {
      const { imageUrl } = await updateUserProfilePic(formData);
      setProfilePic(imageUrl);
    } catch (e) {
      enqueueSnackbar(
        "Error has occured, couldn't update the profile picture "
      );
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { userInfo, userBooks, totalPages, totalCount } =
          await getUserProfile({
            page: page,
            limit: pageSize,
          });
        setUser(userInfo);
        setProfilePic(userInfo.profilePic);
        setUserBooks(userBooks);
        setCount(totalPages);
        setBooksCount(totalCount);
      } catch (e) {
        history.push("/homePage");
      }
    })();
  }, [page, pageSize]);

  return (
    <>
      <AppBarMenu inLoginRoute={false}></AppBarMenu>
      <div>
        <div className={classes.userInfoCotainer}>
          <table className={classes.userTable}>
            <tbody>
              <tr>
                <td className={classes.tdContainer}>
                  <section className={classes.userSection}>
                    <label htmlFor="fileToUpload">
                      {" "}
                      <AddAPhotoIcon
                        className={classes.addImageIcon}
                      ></AddAPhotoIcon>
                      <input
                        type="file"
                        id="fileToUpload"
                        className={classes.fileInput}
                        accept=".png,.jpg,jpeg,.PNG,.JPEG"
                        name="fileToUpload"
                        onChange={handleUpdateProfilePic}
                      />
                    </label>
                    <img className={classes.large} src={profilePic} alt="img" />
                  </section>
                </td>
                <td className={classes.tdContainer}>
                  <ul className={classes.userUl}>
                    <li className={classes.userLi}>
                      <b>Email : </b>
                      {user?.email}
                    </li>
                    <li className={classes.userLi}>
                      <b>My Books Count : </b>
                      {booksCount}
                    </li>
                    <li className={classes.userLi}>
                      {" "}
                      <Button variant="contained" size="large">
                        <Link className={classes.addBookLink} to="/addBook">
                          Add Book
                        </Link>
                      </Button>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
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
              size="large"
              onChange={handlePageChange}
            />
          </div>
          <BooksContainer books={userBooks}></BooksContainer>
        </div>
      </div>
    </>
  );
};

export default Profile;
