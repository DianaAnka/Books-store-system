import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  Collapse,
  Typography,
} from "@material-ui/core";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import useStore from "../store";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { logout } from "../services/authService";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      color: "black",
      flexGrow: 1,
      marginLeft: 10,
      textDecoration: "none",
    },
    logo: {
      width: "200px",
      maxWidth: "40%",
    },
    links: {
      textDecoration: "none",
      font: "700 14px/25px 'Roboto', sans-serif",
      textTransform: "capitalize",
      color: "#000000",
      fontSize: "14px",
      padding: "0px",
      textalign: "left",
      fontWeight: 400,
      letterSpacing: "0.5px",
    },
    home: {
      flexGrow: 1,
      textDecoration: "none",
      font: "700 24px/25px 'Roboto', sans-serif",
      lineHeight: "initial",
      color: "black",
    },
    button: {
      width: "20px",
      maxWidth: "20%",
    },
    hidden: {
      marginLeft: 5,
      display: "inline-block",
      fontSize: "14px",
      lineHeight: "33px",
      fontWeight: 700,
      letterSpacing: "0.5px",
      fontFamily: "'Roboto', sans-serif",
      webkitFontSmoothing: "antialiased",
      textTransform: "none",
      color: "inherit",
    },
    icon: {
      color: "inherit",
      width: 50,
      height: 45,
    },
    openButton: {
      fontSize: "14px",
      lineHeight: "33px",
      fontWeight: 700,
      color: "#000000",
      "&:hover": {
        color: "red",
      },
    },
    menu: {
      minWidth: "250px",
    },
  })
);

const Navbar = () => {
  const classes = useStyles();
  const store = useStore((state) => state);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const matches = useMediaQuery("(min-width: 768px)");
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    try {
      await logout();
      store.setUser({
        email: "",
        isLogged: false,
      });
      enqueueSnackbar("Logout");
      history.push("/home-page");
    } catch (e) {
      enqueueSnackbar("Couldn't logout");
      history.push("/home-page");
    } finally {
    }
  };

  return (
    <div className={classes.root}>
      <AppBar style={{ background: "white" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.home} to="/home-page">
              Home
            </Link>
          </Typography>

          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              className={classes.openButton}
              style={{ marginRight: 24 }}
            >
              <PersonOutlineOutlinedIcon className={classes.icon} />
              <span
                className={classes.hidden}
                style={{ display: matches ? "inline-block" : "none" }}
              >
                My Account
              </span>
            </Button>
            <Menu
              TransitionComponent={Collapse}
              transitionDuration={500}
              className={classes.menu}
              elevation={0}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {store.user?.isLogged ? (
                <>
                  {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleClose}>
                    <Link className={classes.links} to="/sign-up">
                      Register
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link className={classes.links} to="/sign-in">
                      Login
                    </Link>
                  </MenuItem>
                </>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
