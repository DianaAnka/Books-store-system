import React, { useReducer, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import useStore from "../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 450,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: "center",
      width: 400,
    },
    link: {
      textDecoration: "none",
    },
    root: {
      height: "100vh",
      textAlign: "center",
      verticalAlign: "middle",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: " #d9e4f5",
      backgroundImage: "linear-gradient(315deg, #d9e4f5 0%, #f5e3e6 74%)",
    },
    logoImg: {
      height: "12vh",
    },
  })
);

//state type

type State = {
  email: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  email: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

type Action =
  | { type: "setEmail"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "setIsButtonDisabled"; payload: boolean }
  | { type: "loginSuccess"; payload: string }
  | { type: "loginFailed"; payload: string }
  | { type: "setIsError"; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setEmail":
      return {
        ...state,
        email: action.payload,
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case "loginSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case "loginFailed":
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case "setIsError":
      return {
        ...state,
        isError: action.payload,
      };
  }
};

const Login = (props: any) => {
  const store = useStore((state) => state);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.email.trim() && state.password.trim()) {
      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });
    } else {
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });
    }
  }, [state.email, state.password]);

  const handleLogin = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: state.email, password: state.password }),
    };
    fetch("/login", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = data.error;
          return Promise.reject(error);
        }
        dispatch({
          type: "loginSuccess",
          payload: "Login Successfully",
        });
        enqueueSnackbar("Login is complete, welcome back");
        store.setUser({
          email: state.email,
          isLogged: true,
        });
        window.localStorage.setItem("email", state.email);
        history.push("/homePage");
      })
      .catch((error) => {
        dispatch({
          type: "loginFailed",
          payload: error,
        });
        enqueueSnackbar(error);
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setEmail",
      payload: event.target.value,
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setPassword",
      payload: event.target.value,
    });
  };
  return (
    <div className={classes.root}>
      <form className={classes.container} noValidate autoComplete="off">
        <div className={classes.header}>
          <Link to="/homePage">
            <img
              className={classes.logoImg}
              src="public/colorLOGO.png"
              alt=""
            />
          </Link>
          <h3>Sign In to Books Store System</h3>{" "}
        </div>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            error={state.isError}
            id="email"
            type="email"
            label="Email"
            placeholder="Email"
            margin="normal"
            onChange={handleEmailChange}
            onKeyPress={handleKeyPress}
          />
          <TextField
            fullWidth
            error={state.isError}
            variant="outlined"
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            margin="normal"
            onChange={handlePasswordChange}
            onKeyPress={handleKeyPress}
            helperText={state.helperText}
          />
        </div>
        <div className={classes.header}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleLogin}
            disabled={state.isButtonDisabled}
          >
            Sign in
          </Button>
        </div>
        <div className={classes.header}>
          <span>
            {" "}
            <p>
              Don't have an account?
              <Link className={classes.link} to="/register">
                Create one.
              </Link>
            </p>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
