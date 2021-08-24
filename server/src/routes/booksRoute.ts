import { Router } from "express";
import * as bookController from "../controllers/bookController";
import getUserIdentity from "../middlewares/getUserIdentityMiddleware";

const bookRoutes: Router = Router();

bookRoutes.get("/books", bookController.getBooksController);

bookRoutes.post("/addBook", getUserIdentity, bookController.addBookController);

export default bookRoutes;
