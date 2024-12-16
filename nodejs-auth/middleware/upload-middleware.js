
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
module.exports = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB file size limit
  },
});