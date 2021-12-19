import { useEffect, useState } from "react";
import { getUserProfile } from "../services/userService";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AppBarMenu from "./appBar";
import BooksContainer from "./booksContainer";
import PaginationContainer from "./pagination";
import UserInfoContainer from "./userInfoContainer";
import { IBook } from "../types/bookTypes";
import { IUser } from "../types/userTypes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    booksContainer: {
      height: "50%",
    },
  })
);

const Profile = () => {
  const classes = useStyles();
  const [user, setUser] = useState<IUser>();
  const [profilePic, setProfilePic] = useState<string | undefined>(undefined);
  const [userBooks, setUserBooks] = useState<IBook[]| undefined>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState<number| undefined>(0);
  const [booksCount, setBooksCount] = useState<number| undefined>(0);
  const [pageSize, setPageSize] = useState(3);
  const history = useHistory();

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPage(1);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getUserProfile({
          page: page,
          limit: pageSize,
        });
        setUser(data?.userInfo);
        setProfilePic(data?.userInfo.profilePic);
        setUserBooks(data?.userBooks);
        setCount(data?.totalPages);
        setBooksCount(data?.totalCount);
      } catch (e) {
        history.push("/homePage");
      }
    })();
  }, [page, pageSize]);

  return (
    <>
      <AppBarMenu inLoginRoute={false}></AppBarMenu>
      <div>
        <UserInfoContainer email={user?.email!} profilePic={profilePic} />
        <div className={classes.booksContainer}>
          <h1>My Books</h1>
          <PaginationContainer
            count={count}
            booksCount={booksCount}
            handlePageChange={handlePageChange}
            handlePageSizeChange={handlePageSizeChange}
          />
        </div>
        <BooksContainer books={userBooks} />
      </div>
    </>
  );
};

export default Profile;
