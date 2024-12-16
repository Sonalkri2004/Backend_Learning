const Image = require("../models/image");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");

const cloudinary = require("../config/cloudinary");
// now add file system and after uploading it into local machine we need to delete it from our local machine.
const fs = require("fs");

// this is our upload image controller logic

const uploadImageController = async (req, res) => {
  try {
    //check if file is missing in req object
    // first we will check the file is present or not means provided by user or not
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload an image",
      });
    }

    // if it is present then upload the image or any file in this project we are using image , to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    //store the image url and public id along with the uploaded user id in database
    // now store the file or save the file into our database 
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    await newlyUploadedImage.save();

    //delete the file from local stroage
    // fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Imaged uploaded successfully",
      image: newlyUploadedImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

// now write the controller for fetching all the images

const fetchImagesController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);

    const sortObj = {};
    sortObj[sortBy] = sortOrder;
    const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

    if (images) {
      res.status(200).json({
        success: true,
        currentPage: page,
        totalPages: totalPages,
        totalImages: totalImages,
        data: images,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

// now write the controller to delete the image from database 
const deleteImageController = async (req, res) => {
  try {
    const getCurrentIdOfImageToBeDeleted = req.params.id;
    const userId = req.userInfo.userId;

    const image = await Image.findById(getCurrentIdOfImageToBeDeleted);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    //check if this image is uploaded by the current user who is trying to delete this image
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: `You are not authorized to delete this image because you haven't uploaded it`,
      });
    }

    //delete this image first from your cloudinary stroage 
    // before deleting it from the db first delete the image from cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    //delete this image from mongodb database
    // then from the database
    await Image.findByIdAndUpdate(getCurrentIdOfImageToBeDeleted);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

module.exports = {
  uploadImageController,
  fetchImagesController,
  deleteImageController,
};