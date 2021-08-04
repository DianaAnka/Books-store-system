import { ChangeEvent, useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { getBooks } from "../services/booksService";
import BookCard from "./bookCard";
import { Grid, GridSpacing, makeStyles, TextField } from "@material-ui/core";
import { IBook, QueryParams } from "../types/bookTypes";
import AppBarMenu from "./AppBar";
import useStore from "../store";

const useStyles = makeStyles({
  paginatore: {
    marginTop: "20px",
    marginBottom: "20px",
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, 0)",
  },
  flexContainer: {
    marginTop: "7%",
    height: "100%",
    width: "90%",
    columnCount: 3,
    listStyleType: "none",
  },
  item: {
    height: "100%",
    width: "100%",
  },
  search: {
    width: "10%",
    height: 40,
    padding: 10,
  },
  searchBtn: {
    display: "inline",
    marginLeft: 20,
    height: 40,
    fontSize: 17,
  },
});

const HomePage = () => {
  const classes = useStyles();
 
  const [books, setBooks] = useState<IBook[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [booksCount, setBooksCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [queryIsChanged, setQueryIsChanged] = useState(false);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    author: "",
    title: "",
    abstract: "",
  });
  const [anyField, setAnyField] = useState("");
  const pageSizes = [3, 6, 9];

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: any) => {
    setPageSize(event.target?.value);
    setPage(1);
  };

  const sendSearchQuery = () => {
    setPage(1);
    setQueryIsChanged(!queryIsChanged);
  };

  useEffect(() => {
    const params = {
      page: page,
      limit: pageSize,
      anyField: anyField,
      author: queryParams?.author,
      title: queryParams?.title,
      abstract: queryParams?.abstract,
    };
    (async () => {
      try {
        setIsError(false);
        const { books, totalPages, totalCount } = await getBooks(params);
        setBooks(books);
        setCount(totalPages);
        setBooksCount(totalCount);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, pageSize, queryIsChanged]);

  useEffect(() => {
    if (
      queryParams.author?.length == 0 &&
      queryParams.title?.length == 0 &&
      queryParams.abstract?.length == 0 &&
      anyField.length == 0
    )
      setQueryIsChanged(!queryIsChanged);
  }, [queryParams, anyField]);

  return (
    <>
      <AppBarMenu inLoginRoute={false}></AppBarMenu>
      <div>
        <h1>Books List</h1>
        <div className="input-group mb-3">
          <TextField
            type="search"
            className={classes.search}
            placeholder="Any Field"
            value={anyField}
            onChange={({ target }) =>
              setAnyField(target.value.trim().toLowerCase())
            }
          />
          <TextField
            type="search"
            className={classes.search}
            placeholder="Author"
            value={queryParams?.author}
            disabled={anyField ? true : false}
            onChange={({ target }) =>
              setQueryParams({
                ...queryParams,
                author: target.value.trim().toLowerCase(),
              })
            }
          />
          <TextField
            type="search"
            className={classes.search}
            placeholder="Title"
            value={queryParams?.title}
            disabled={anyField ? true : false}
            onChange={({ target }) =>
              setQueryParams({
                ...queryParams,
                title: target.value.trim().toLowerCase(),
              })
            }
          />
          <TextField
            type="search"
            className={classes.search}
            placeholder="Abstract"
            value={queryParams?.abstract}
            disabled={anyField ? true : false}
            onChange={({ target }) =>
              setQueryParams({
                ...queryParams,
                abstract: target.value.trim().toLowerCase(),
              })
            }
          />
          <button
            className={classes.searchBtn}
            type="button"
            onClick={sendSearchQuery}
          >
            Search
          </button>
        </div>
        <div className="mt-3">
          {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
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
    </>
  );
};

export default HomePage;
