import React, { useReducer, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

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
  isError: boolean;
};

const initialState: State = {
  email: "",
  password: "",
  isButtonDisabled: true,
  isError: false,
};

type Action =
  | { type: "setEmail"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "setIsButtonDisabled"; payload: boolean }
  | { type: "registerSuccess"; payload: string }
  | { type: "registerFailed"; payload: string }
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
    case "registerSuccess":
      return {
        ...state,
        isError: false,
      };
    case "registerFailed":
      return {
        ...state,
        isError: true,
      };
    case "setIsError":
      return {
        ...state,
        isError: action.payload,
      };
  }
};

const Register = (props: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (validateEmail(state.email) && validatePassword(state.password)) {
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

  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function validatePassword(password: string) {
    if (password.length >= 8 && password.length <= 30) return true;
    return false;
  }
  const handleRegister = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: state.email, password: state.password }),
    };
    fetch("/register", requestOptions)
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
          type: "registerSuccess",
          payload: "register Successfully",
        });
        enqueueSnackbar("Registering is complete, you can Log in");
        props.history.push("/login");
      })
      .catch((error) => {
        dispatch({
          type: "registerFailed",
          payload: "Email exists",
        });
        enqueueSnackbar("Email exists ");
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleRegister();
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
          <h3>Sign Up to Books Store System</h3>{" "}
        </div>
        <div>
          <TextField
            variant="outlined"
            error={state.isError}
            fullWidth
            id="email"
            type="email"
            label="Email"
            placeholder="Email"
            margin="normal"
            onChange={handleEmailChange}
            onKeyPress={handleKeyPress}
            helperText={
              state.email && !validateEmail(state.email)
                ? "enter valid email"
                : ""
            }
          />
          <TextField
            variant="outlined"
            error={state.isError}
            fullWidth
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            margin="normal"
            onChange={handlePasswordChange}
            onKeyPress={handleKeyPress}
            helperText={
              state.password && !validatePassword(state.password)
                ? "password must be between 8 - 30 characters"
                : ""
            }
          />
        </div>
        <div className={classes.header}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleRegister}
            disabled={state.isButtonDisabled}
          >
            Sign Up
          </Button>
        </div>
        <div className={classes.header}>
          <span>
            <p>
              Already have account?
              <Link className={classes.link} to="/login">
                Log in
              </Link>
            </p>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
