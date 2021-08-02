import { Router } from "express";
import * as bookController from "../controllers/bookController";
import getUserIdentity from "../middlewares/getUserIdentityMiddleware";

const booksRoute: Router = Router();

booksRoute.get("/books", bookController.getBooks);

booksRoute.post("/addBook", getUserIdentity, bookController.addBook);

export default booksRoute;
