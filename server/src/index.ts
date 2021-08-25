import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute";
import bookRoutes from "./routes/booksRoute";
import userRoutes from "./routes/userRoute";
import commentRoutes from "./routes/commentRoute";
import ratingRoutes from "./routes/ratingRoute";

const app = express();
app.use(json());
app.use(cookieParser());
app.use(cors());
app.use("/", authRoutes);
app.use("/", bookRoutes);
app.use("/", userRoutes);
app.use("/", commentRoutes);
app.use("/", ratingRoutes);
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
