import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import auth from "../auth.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    position: "relative",
    backgroundImage: `url(${auth})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    width: "100%",
    overflow: "hidden",
    zIndex: 1,
  },
  empty: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: "rgba(0, 0, 0, 0.1)",
    zIndex: -1,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const AuthLayout: React.FC<{}> = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      
      <div className={classes.root}>
      <div className={classes.empty}></div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            {children}
          </div>
        </Container>
      </div>
    </>
  );
};

export default AuthLayout;
