import util from "util";
import multer from "multer";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
let uploadFile = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|PNG|JPG|JPEG)$/)) {
      return cb(new Error("only upload files with jpg, jpeg, png format."));
    }
    cb(null, true);
  },
}).single("file");

export default uploadFile;
