import { Router } from "express";
import * as bookController from "../controllers/bookController";
import getUserIdentity from "../middlewares/getUserIdentityMiddleware";

const booksRoute: Router = Router();

booksRoute.get("/books", bookController.getBooksController);

booksRoute.post("/addBook", getUserIdentity, bookController.addBookController);

export default booksRoute;
