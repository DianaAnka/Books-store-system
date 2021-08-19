import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles({
  paginatore: {
    marginTop: "40px",
    marginBottom: "20px",
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, 0)",
  },
  search: {
    width: "15%",
    height: 40,
    padding: 10,
    borderColor: "black",
  },
  searchBtn: {
    display: "inline",
    marginLeft: 20,
    height: 40,
    fontSize: 17,
    marginTop: 17,
    borderRadius: 40,
  },
  img: {
    width: "75vw",
    objectFit: "cover",
  },
  itemPerPage: {
    marginTop: 20,
  },
});
const PaginationContainer = (
  { handlePageSizeChange }: any,
  { handlePageChange }: any
) => {
  const classes = useStyles();
  const [pageSize, setPageSize] = useState(3);
  const [booksCount, setBooksCount] = useState(0);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const pageSizes = [3, 6, 9];

  return (
    <div className={classes.itemPerPage}>
      {"Items per Page: "}
      <select onChange={() => handlePageSizeChange(pageSize)} value={pageSize}>
        {pageSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      {" Total Books Count: "}
      {booksCount}
      <Pagination
        className={classes.paginatore}
        count={count}
        page={page}
        siblingCount={1}
        boundaryCount={1}
        variant="outlined"
        shape="rounded"
        size="large"
        onChange={() => handlePageChange(page)}
      />
    </div>
  );
};

export default PaginationContainer;
