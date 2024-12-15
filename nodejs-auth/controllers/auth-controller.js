
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//register controller
const registerUser = async (req, res) => {
  try {

     //extract user information from our request body
     const { username, email, password, role } = req.body;

     //check if the user is already exists in our database
    const checkExistingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (checkExistingUser) {
        return res.status(400).json({
          success: false,
          message:
            "User is already exists either with same username or same email. Please try with a different username or email",
        });
      }
   
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

//login controller

const loginUser = async (req, res) => {
  try {
    
    }
   catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};



   

module.exports = { registerUser, loginUser};