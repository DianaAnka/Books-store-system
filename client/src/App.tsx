import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import HomePage from "./components/homePage";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import useStore from "./store";
import Profile from "./components/profile";
import UnAuthorized from "./components/unAuthorized";
import BookPage from "./components/bookPage";
import { isLogged, logout } from "./services/authenticationService";
import AddBookFom from "./components/addBookForm";
import Header from "./components/header";
import { useHistory } from "react-router-dom";
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

function App(props: any) {
  const store = useStore((state) => state);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      if (store.user?.isLogged)
        try {
          setIsError(false);
          const response = await isLogged();
          store.setUser({
            email: window.localStorage.getItem("email") || "",
            isLogged: true,
          });
        } catch (e) {
          // await logout();
          enqueueSnackbar("Your session has ended");
          history.push("/homePage");
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
    })();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
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
function componentWillMount() {
  throw new Error("Function not implemented.");
}
