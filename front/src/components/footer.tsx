import {
  Box,
  Container,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "inline-block",
      width: "100%",
      padding: "50px 0",
      backgroundColor: "#393737",
      color: "white",
    },
  })
);

const Footer = () => {
  const classes = useStyles();

  return (
    <>
      <footer className={classes.root}>
        <Container>
          <Box display="flex" justifyContent="center">
            <p>Done with passion</p>
          </Box>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
