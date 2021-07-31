import { Router } from "express";
import * as bookController from "../controllers/bookController";

const booksRoute: Router = Router();

booksRoute.get("/books", bookController.getBooks);

booksRoute.post("/addBook", bookController.addBook);


export default booksRoute;
