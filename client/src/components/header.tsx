import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import useStore from "../store";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { logout } from "../services/authenticationService";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      paddingTop: 20,
      background: "lavender",
      paddingBottom: 60,
    },
    loginButton: {
      position: "absolute",
      left: 20,
    },
    logoutButton: {
      position: "absolute",
      left: 20,
    },
    loginLink: {
      textDecoration: "none",
      color: "white",
    },
    email: {
      position: "absolute",
      left: 140,
      fontSize: 20,
    },
    websiteName: {
      right: 20,
      position: "absolute",
      textDecoration: "none",
      fontSize: 30,
      fontWeight: "bold",
    },
  })
);
const Header = (props: any) => {
  const store = useStore((state) => state);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const classes = useStyles();

  const handleLogout = async () => {
    try {
      setIsError(false);
      const user = await logout();
      store.setUser({
        email: "",
        isLogged: false,
      });
      enqueueSnackbar("Logout");
      history.push("/homePage");
    } catch (e) {
      setIsError(true);
      console.log("error ", e);
      enqueueSnackbar("Couldn't logout");
      history.push("/homePage");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.header}>
      <div>
        {store.user?.isLogged ? (
          <>
            <Link to="/me">
              <b className={classes.email}>{store.user.email}</b>
            </Link>
            <Button
              className={classes.logoutButton}
              variant="contained"
              size="large"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            className={classes.loginButton}
            variant="contained"
            size="large"
            color="secondary"
          >
            <Link className={classes.loginLink} to="/login">
              Login
            </Link>
          </Button>
        )}
      </div>
      <Link className={classes.websiteName} to="/homePage">
        BSS
      </Link>
    </div>
  );
};

export default Header;
