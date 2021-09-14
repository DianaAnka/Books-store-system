import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, makeStyles, useMediaQuery } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    height: 40,
    padding: "30px 0",
  },
  title: {
    display: "inline-block",
    position: "relative",
    background: " #e5e2e2",
    padding: 0,
    border: 0,
    textAlign: "left",
    margin: 0,
    font: "700 24px/20px 'Roboto Slab', serif",
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    paddingLeft: 35,
  },
  itemSize: {
    textTransform: "capitalize",
    font: "700 24px/20px 'Roboto Slab', serif",
    marginTop: "10px",
    textAlign: "center",
  },
  arrowscontainer: {
    display: "inline-block",
    float: "right",
    margin: "auto",
  },
  arrow: {
    boxSizing: "unset",
    border: 0,
    WebkitTapHighlightColor: "transparent",
    width: "30px",
    height: "30px",
    padding: "8px 15px",
    textAlign: "center",
    background: "#ffffff",
    color: "#ff0000",
    marginLeft: "10px",
    "&:hover": {
      color: "white",
      background: "red",
    },
  },
}));

interface PaginationProps {
  title: string;
  count?: number;
  booksCount?: number;
  page: number;
  handlePageChange: (page: number) => void;
}

const PaginationContainer = (props: PaginationProps) => {
  const classes = useStyles();
  const [page, setPage] = useState(props.page);
  const matches = useMediaQuery("(min-width:300px)");

  const handleLeftArrow = () => {
    let temp = page;
    if (page !== 1) {
      temp = page - 1;
      setPage(temp);
    } else if (props.count) {
      temp = props.count;
      setPage(props.count);
    }
    if (temp) props.handlePageChange(temp);
  };

  const handleRightArrow = () => {
    let temp = page;
    if (page !== props.count) {
      temp = page + 1;
      setPage(page + 1);
    } else {
      temp = 1;
      setPage(1);
    }
    props.handlePageChange(temp);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container direction="row" alignItems="center" spacing={10}>
          <Grid item xs={6} md={8} lg={10} sm={3}>
            <div
              className={classes.title}
              style={{ fontSize: matches ? "20px" : "30px" }}
            >
              {props.title}
            </div>
          </Grid>
          <Grid item>
            <FontAwesomeIcon
              onClick={handleLeftArrow}
              className={classes.arrow}
              icon={["fas", "angle-left"]}
            />
            <FontAwesomeIcon
              onClick={handleRightArrow}
              className={classes.arrow}
              icon={["fas", "angle-right"]}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default PaginationContainer;
