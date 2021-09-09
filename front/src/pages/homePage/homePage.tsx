import {
  Box,
  CircularProgress,
  Container,
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
  const [books, setBooks] = useState<GetBookDTO[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>(0);
  const [totalCount, setTotalCount] = useState<number | undefined>(0);
  const [anyField, setAnyField] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const debouncedSearchTerm = useDebounce(anyField, 500);
  const matches = useMediaQuery("(max-width:991px)");

  useEffect(() => {
    const params = {
      page: page,
      limit: 15,
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
  }, [page, debouncedSearchTerm]);

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
              setAnyField(e.target.value);
            }}
          />
        </Box>

        {isError ? (
          <div>Error </div>
        ) : isLoading ? (
          <Box
            width="75%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginLeft="auto"
            marginRight="auto"
          >
            <CircularProgress size={200} />
          </Box>
        ) : (
          <>
            <Container>
              <PaginationContainer
                title="our collection"
                count={totalPages}
                booksCount={totalCount}
                page={page}
                handlePageChange={(value) => setPage(value)}
              />
              <BooksContainer books={books} />
            </Container>
          </>
        )}
        {books.length === 0 ? <>no results to show </> : <></>}
      </HomePageLayout>
    </>
  );
};

export default HomePage;
