import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthLayout from "../../layouts/authLayout";
import { getUser, login } from "../../services/authService";
import useStore from "../../store";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const store = useStore((state) => state);

  const [email, setEmail] = useState<string>("");
  const [password, setPasword] = useState<string>("");

  const handleLogin = async () => {
    try {
      await login({ email, password });
      enqueueSnackbar("Login is complete");
      const { user } = await (await getUser()).data;
      store.setUser({
        email: user.email,
        isLogged: true,
        profilePic: user.profilePic,
        rates: user.rates,
      });
      history.push("/home-page");
    } catch (error) {
      enqueueSnackbar("Email or password is incorrect");
    }
  };

  return (
    <>
      <AuthLayout>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={({ target }) => setEmail(target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={({ target }) => setPasword(target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/sign-up">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </>
  );
};

export default Login;
