import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import useStore from "../store";
import { Link, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { logout } from "../services/authenticationService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: "Open Sans Condensed",
      fontSize: "1.5em",
      flexGrow: 1,
      backgroundColor: "white",
      color: "black",
    },
    title: {
      flexGrow: 1,
      color: "black",
    },
    loginLink: {
      textDecoration: "none",
      color: "black",
    },
    links: {
      fontFamily: "Open Sans Condensed",
      textDecoration: "none",
      marginLeft: "70%",
      paddingRight: 20,
    },
    titleLink: {
      fontFamily: "Open Sans Condensed",
      textDecoration: "none",
      flexGrow: 1,
    },
  })
);

const AppBarMenu = (props: any) => {
  const store = useStore((state) => state);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      store.setUser({
        email: "",
        isLogged: false,
      });
      enqueueSnackbar("Logout");
      history.push("/homePage");
    } catch (e) {
      enqueueSnackbar("Couldn't logout");
      history.push("/homePage");
    } finally {
    }
  };

  return (
    <div className={classes.root}>
      <AppBar style={{ background: "white" }} position="static">
        <Toolbar>
          <Link className={classes.titleLink} to="/homePage">
            <img src="public/logo.png" alt="" />
          </Link>
          <Link className={classes.links} to="/me">
            {store.user?.email}
          </Link>{" "}
          {store.user?.isLogged ? (
            <Button size="large" onClick={handleLogout}>
              Logout
            </Button>
          ) : !props.inLoginRoute ? (
            <Button size="large">
              <Link className={classes.loginLink} to="/login">
                Login
              </Link>
            </Button>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarMenu;
