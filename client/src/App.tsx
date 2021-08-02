import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Link,
  Redirect,
} from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import HomePage from "./components/homePage";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import useStore from "./store";
import Profile from "./components/profile";
import UnAuthorized from "./components/unAuthorized";
import BookPage from "./components/bookPage";
import { isLogged, logout } from "./services/authenticationService";
import AddBookFom from "./components/addBookForm";

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

function App() {
  const store = useStore((state) => state);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const classes = useStyles();

  const handleLogout = async () => {
    try {
      setIsError(false);
      const user = await logout();
      console.log(user);
      store.setUser({
        email: "",
        isLogged: false,
      });
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const params = {
      email: window.localStorage.getItem("email") || "",
    };
    console.log("hello");
    (async () => {
      try {
        setIsError(false);
        const response = await isLogged();
        console.log(response);
        store.setUser({
          email: window.localStorage.getItem("email") || "",
          isLogged: true,
        });
        console.log("store ", store.user);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <Router>
      <div className="App">
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
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/homePage" component={HomePage} />
        <Route path="/me" component={Profile} />
        <Route path="/401" component={UnAuthorized} />
        <Route path="/bookPage" component={BookPage} />
        <Route path="/addBook" component={AddBookFom} />
        <Route exact path="/">
          <Redirect to="/homePage" />
        </Route>
      </div>
    </Router>
  );
}

export default App;
