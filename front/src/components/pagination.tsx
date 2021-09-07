import { Box, makeStyles, useMediaQuery } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles(() => ({
  itemSize: {
    textTransform: "capitalize",
    font: "700 24px/20px 'Roboto Slab', serif",
    marginTop: "10px",
    textAlign: "center",
  },
}));

interface PaginationProps {
  count?: number;
  booksCount?: number;
  pageSize: number;
  page: number;
  handlePageSizeChange: (pageSize: number) => void;
  handlePageChange: (page: number) => void;
}

const PaginationContainer = (props: PaginationProps) => {
  const classes = useStyles();
  const [pageSize, setPageSize] = useState(props.pageSize);
  const [page, setPage] = useState(props.page);
  const pageSizes = [3, 6, 9];
  const matches = useMediaQuery("(min-width:300px)");

  return (
    <>
      <div className={classes.itemSize}>
        {"Items per Page: "}
        <select
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            console.log("page ", event.target?.value);
            setPageSize(event.target?.value as number);
            props.handlePageSizeChange(event.target?.value as number);
          }}
          value={pageSize}
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Box display="flex" justifyContent="center">
          <Pagination
            className={classes.itemSize}
            count={props.count}
            defaultPage={1}
            siblingCount={0}
            page={page}
            onChange={(_event: ChangeEvent<unknown>, page: number) => {
              setPage(page);
              props.handlePageChange(page);
            }}
            boundaryCount={matches ? 1 : 0}
          />
        </Box>
      </div>
    </>
  );
};

export default PaginationContainer;
