import { useEffect, useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import HomePage from "./components/homePage";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import useStore from "./store";
import Profile from "./components/profile";
import UnAuthorized from "./components/unAuthorized";
import BookPage from "./components/bookPage";
import { isLogged } from "./services/authenticationService";
import AddBookForm from "./components/addBookForm";
import { useHistory } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import PublicRoute from "./components/publicRoute";

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
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        await isLogged();
        store.setUser({
          email: window.localStorage.getItem("email") || "",
          isLogged: true,
        });
      } catch (e) {
        store.setUser({
          email: "",
          isLogged: false,
        });
        history.push("/homePage");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <Router>
      {isLoading && <h1>Loading</h1>}
      {!isLoading && (
        <div className="App">
          <Switch>
            <PrivateRoute path="/me" component={Profile} />
            <Route path="/401" component={UnAuthorized} />
            <Route path="/bookPage" component={BookPage} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/register" component={Register} />
            <PrivateRoute path="/addBook" component={AddBookForm} />
            <Route exact path="/">
              <Redirect to="/homePage" />
            </Route>
            <Route path="/homePage" component={HomePage} />
          </Switch>
        </div>
      )}
    </Router>
  );
}

export default App;
