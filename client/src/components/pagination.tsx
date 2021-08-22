import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";
import { ChangeEvent, useState } from "react";

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

interface PaginationProps {
  count: number;
  booksCount: number;
  handlePageSizeChange: (pageSize: number) => void;
  handlePageChange: (page: number) => void;
}

const PaginationContainer = (Props: PaginationProps) => {
  const classes = useStyles();
  const [pageSize, setPageSize] = useState(3);
  const [page, setPage] = useState(1);
  const pageSizes = [3, 6, 9];

  return (
    <div className={classes.itemPerPage}>
      {"Items per Page: "}
      <select
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
          setPageSize(event.target?.value as number);
          Props.handlePageSizeChange(event.target?.value as number);
          setPage(1);
        }}
        value={pageSize}
      >
        {pageSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      {" Total Books Count: "}
      {Props.booksCount}
      <Pagination
        className={classes.paginatore}
        count={Props.count}
        page={page}
        siblingCount={1}
        boundaryCount={1}
        variant="outlined"
        shape="rounded"
        size="large"
        onChange={(_event: ChangeEvent<unknown>, page: number) => {
          setPage(page);
          Props.handlePageChange(page);
        }}
      />
    </div>
  );
};

export default PaginationContainer;
