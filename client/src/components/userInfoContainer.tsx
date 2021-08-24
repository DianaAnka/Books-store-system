import { updateUserProfilePic } from "../services/userService";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { useEffect, useState } from "react";

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
      backgroundColor: " #d9e4f5",
      backgroundImage: "linear-gradient(315deg, #d9e4f5 0%, #f5e3e6 74%)",
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

interface UserInfoProps {
  email: string;
  profilePic?: string;
}

const UserInfoContainer = (Props: UserInfoProps) => {
  const classes = useStyles();
  const [profilePic, setProfilePic] = useState<string | undefined>(undefined);

  const { enqueueSnackbar } = useSnackbar();

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
    setProfilePic(Props.profilePic);
  }, [Props.profilePic]);

  return (
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
                  {Props.email}
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
  );
};

export default UserInfoContainer;
