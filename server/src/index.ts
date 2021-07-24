import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import multer from "multer";
import withAuth from "./middlewares/withAuthMiddleware";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/authRoute";
import booksRoute from "./routes/booksRoute";
import userRoute from "./routes/userRoute";

const app = express();
app.use(json());
app.use(cookieParser());
app.use(cors());
app.use(multer({ dest: "./uploads/" }).single("file"));
app.use("/", router);
app.use("/", booksRoute);
app.use("/", userRoute);
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

app.get("/api/profile", withAuth, function (req, res) {
  res.json({ message: "Welcome back" });
});
