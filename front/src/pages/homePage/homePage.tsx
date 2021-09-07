import {
  Box,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  useMediaQuery,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import BooksContainer from "../../components/booksContainer";
import PaginationContainer from "../../components/pagination";
import HomePageLayout from "../../layouts/homePageLayout";
import { useDebounce } from "../../lib/debounce";
import { getBooks } from "../../services/booksService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 400,
      lineHeight: "initial",
      textTransform: "capitalize",
      font: "700 24px/20px 'Roboto Slab', serif",
      fontFamily: "'Roboto Slab', serif",
      textAlign: "center",
    },
  })
);

const HomePage = () => {
  const classes = useStyles();
  const [books, setBooks] = useState<GetBooksDTO[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>(0);
  const [pageSize, setPageSize] = useState(3);
  const [totalCount, setTotalCount] = useState<number | undefined>(0);
  const [anyField, setAnyField] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const debouncedSearchTerm = useDebounce(anyField, 500);
  const matches = useMediaQuery("(max-width:991px)");

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPage(1);
  };

  useEffect(() => {
    const params = {
      page: page,
      limit: pageSize,
      anyField: anyField,
    };
    (async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const { data } = await getBooks(params);
        setBooks(data?.books);
        setTotalPages(data?.totalPages);
        setTotalCount(data?.totalCount);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    })();
  }, [page, pageSize, debouncedSearchTerm]);

  return (
    <>
      <HomePageLayout>
        <div
          className={classes.title}
          style={{ fontSize: matches ? "30px" : "50px" }}
        >
          Welcome to our Store
        </div>

        <Box
          width="75%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginLeft="auto"
          marginRight="auto"
        >
          <TextField
            variant="outlined"
            type="search"
            margin="normal"
            required
            fullWidth
            id="search"
            name="search"
            value={anyField}
            autoFocus
            placeholder="search any field"
            onChange={(e) => {
              console.log("1 ", anyField);
              setAnyField(e.target.value);
              console.log("2 ", anyField);
            }}
          />
        </Box>
        {isError ? (
          <div>Error </div>
        ) : isLoading ? (
          <>loading</>
        ) : (
          <BooksContainer books={books} />
        )}
        {books.length === 0 ? <>no results to show </> : <></>}
        <PaginationContainer
          count={totalPages}
          booksCount={totalCount}
          pageSize={pageSize}
          page={page}
          handlePageChange={(value) => setPage(value)}
          handlePageSizeChange={handlePageSizeChange}
        />
      </HomePageLayout>
    </>
  );
};

export default HomePage;
