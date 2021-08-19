import { ChangeEvent, useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { getBooks } from "../services/booksService";
import BooksContainer from "./booksContainer";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { IBook, QueryParams } from "../types/bookTypes";
import AppBarMenu from "./AppBar";
import SearchIcon from "@material-ui/icons/Search";

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

  const queryIsEmpty = () => {
    return queryParams.author?.length === 0 &&
      queryParams.title?.length === 0 &&
      queryParams.abstract?.length === 0 &&
      anyField.length === 0
      ? true
      : false;
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
    if (queryIsEmpty()) setQueryIsChanged(!queryIsChanged);
  }, [queryParams, anyField]);

  return (
    <>
      <AppBarMenu inLoginRoute={false}></AppBarMenu>
      <div>
        <img className={classes.img} src="public/cover.jpg" alt="" />
        <div>
          <h1>Our Books Collections</h1>
          <div className="input-group mb-3">
            <TextField
              type="search"
              className={classes.search}
              placeholder="Search Any Field"
              value={anyField}
              onChange={({ target }) =>
                setAnyField(target.value.trim().toLowerCase())
              }
              variant="outlined"
            />
            <TextField
              type="search"
              className={classes.search}
              placeholder="Book Author"
              value={queryParams?.author}
              disabled={anyField ? true : false}
              onChange={({ target }) =>
                setQueryParams({
                  ...queryParams,
                  author: target.value.trim().toLowerCase(),
                })
              }
              variant="outlined"
            />
            <TextField
              type="search"
              className={classes.search}
              placeholder="Book Title"
              value={queryParams?.title}
              disabled={anyField ? true : false}
              onChange={({ target }) =>
                setQueryParams({
                  ...queryParams,
                  title: target.value.trim().toLowerCase(),
                })
              }
              variant="outlined"
            />
            <TextField
              type="search"
              className={classes.search}
              placeholder="Book Abstract"
              value={queryParams?.abstract}
              disabled={anyField ? true : false}
              onChange={({ target }) =>
                setQueryParams({
                  ...queryParams,
                  abstract: target.value.trim().toLowerCase(),
                })
              }
              variant="outlined"
            />
            <Button
              className={classes.searchBtn}
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={sendSearchQuery}
            >
              Find Book
            </Button>
          </div>

          <div className={classes.itemPerPage}>
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
        </div>
        <BooksContainer books={books}></BooksContainer>
      </div>
    </>
  );
};

export default HomePage;
