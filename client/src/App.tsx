import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import HomePage from "./components/homePage";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginTop: 20,
    },
    loginButton: {
      position: "absolute",
      left: 20,
    },
    loginLink: {
      textDecoration: "none",
      color: "white",
    },
  })
);

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className="App">
        <div className={classes.header}>
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
          <TextField
            id="outlined-search"
            label="Search field"
            type="search"
            variant="outlined"
          />
        </div>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/homePage" component={HomePage} />
      </div>
    </Router>
  );
}

export default App;
