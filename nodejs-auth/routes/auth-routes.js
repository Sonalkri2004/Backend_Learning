const express = require("express");
const {
  registerUser,
  loginUser,
  changePassword,
} = require("../controllers/auth-controller");
const router = express.Router();
// add auth middleware to protect the route
const authMiddleware = require("../middleware/auth-middleware");

//all routes are related to authentication & authorization
router.post("/register", registerUser);
router.post("/login", loginUser);
// add the route for change password
router.post("/change-password", authMiddleware, changePassword);

module.exports = router;