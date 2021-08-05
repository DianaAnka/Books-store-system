import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/authRoute";
import booksRoute from "./routes/booksRoute";
import userRoute from "./routes/userRoute";

const app = express();
app.use(json());
app.use(cookieParser());
app.use(cors());
app.use("/", router);
app.use("/", booksRoute);
app.use("/", userRoute);
app.use(express.static("images"));
mongoose.connect(
  "mongodb://localhost:27017/bss",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  function (err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to database`);
      app.listen(5000, () => {
        console.log("server is listening on port 5000");
      });
    }
  }
);
