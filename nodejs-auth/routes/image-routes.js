const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const uploadMiddleware = require("../middleware/upload-middleware");
const {
  uploadImageController,
  fetchImagesController,
  deleteImageController,
} = require("../controllers/image-controller");

const router = express.Router();

//upload the image
// now we will create the route to upload the image by user for this we use our req middleware as used in the code below
router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImageController
);

//to get all the images
router.get("/get", authMiddleware, fetchImagesController);

//delete image route
router.delete("/:id", authMiddleware, adminMiddleware, deleteImageController);

module.exports = router;