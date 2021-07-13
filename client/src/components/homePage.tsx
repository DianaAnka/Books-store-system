import { ChangeEvent, useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { getBooks } from "../services/booksService";
import { AxiosResponse } from "axios";
import BookCard from "./bookCard";
import { makeStyles } from "@material-ui/core";
import { IBook } from "../type";

const useStyles = makeStyles({
  paginatore: {
    marginTop: "20px",
    position: "fixed",
    left: "50%",
    transform: "translate(-50%, 0)",
  },
  flexContainer: {
    marginTop: "5%",
    height: "100%",
    width: "90%",
    columnCount: 3,
    listStyleType: "none",
  },
  item: {
    height: "100%",
    width: "100%",
  },
});

const HomePage = () => {
  const classes = useStyles();
  const [books, setBooks] = useState<IBook[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [3, 6, 9];

  const retrieveBooks = () => {
    const params = { page: page, limit: pageSize };

    getBooks(params)
      .then((response: AxiosResponse) => {
        const { books, totalPages } = response.data;
        setBooks(books);
        setCount(totalPages);
      })
      .catch((e: Error) => {
        throw e;
      });
  };
  useEffect(retrieveBooks, [page, pageSize]);
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handlePageSizeChange = (event: any) => {
    setPageSize(event.target?.value);
   // setPage(1);
  };
  return (
    <div>
      <h1>Books List</h1>

      <div className="mt-3">
        {"Items per Page: "}
        <select onChange={handlePageSizeChange} value={pageSize}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <Pagination
          className={classes.paginatore}
          count={count}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </div>
      <ul className={classes.flexContainer}>
        {books &&
          books.map((book, index) => (
            <li className={classes.item} key={index}>
              <BookCard {...book} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HomePage;
