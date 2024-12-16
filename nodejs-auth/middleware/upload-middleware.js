
// then require it to make a middleware
const multer = require("multer");
const path = require("path");

//set our multer storage
// now we will create the disk storage in upload folder
//On the Server (Local Storage):
//Files are saved directly to a specified folder on your server (e.g., /uploads).

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,

      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//file filter function
// The file filter function in Multer is used to control which files are allowed to be uploaded by checking their type or other criteria before saving them.
const checkFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images"));
  }
};

//multer middleware

// This Multer middleware is used to handle file uploads with the following settings:

// storage: Defines where and how the uploaded files should be saved (like in a specific folder or in memory).
// fileFilter: Specifies a function to check if the uploaded file is allowed (for example, only allowing images or PDFs).
// limits: Sets a file size limit (in this case, 5MB). If a file exceeds the limit, it will be rejected.
// In simple terms, this middleware manages where to save files, checks if the files are of the correct type, and ensures that files aren't too large.

module.exports = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB file size limit
  },
});