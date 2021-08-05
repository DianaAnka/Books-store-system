import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useStore from "../store";
import { Link, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { logout } from "../services/authenticationService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "lavender",
      color: "black",
      marginBottom: "2%",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: "black",
    },
    loginLink: {
      textDecoration: "none",
      color: "white",
    },
    links:{
      textDecoration: "none",
    }
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
      console.log("error ", e);
      enqueueSnackbar("Couldn't logout");
      history.push("/homePage");
    } finally {
    }
  };

  return (
    <div className={classes.root}>
      <AppBar style={{ background: "lavender" }} position="static">
        <Toolbar>
          <Typography
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Link className={classes.links} to="/me">
              {store.user?.email}
            </Link>
          </Typography>
          <Typography variant="h4" className={classes.title}>
            <Link className={classes.links} to="/homePage">
              BSS
            </Link>
          </Typography>{" "}
          {store.user?.isLogged ? (
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : !props.inLoginRoute ? (
            <Button variant="contained" size="large" color="secondary">
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
