import multer from "multer";

let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|PNG|JPG|JPEG)$/))
      return callback(
        new Error("only upload files with jpg, jpeg, png format.")
      );
    callback(null, true);
  },
}).single("file");

export default uploadFile;
