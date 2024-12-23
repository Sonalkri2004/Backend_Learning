
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

 //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

//create a new user and save in your database
     const newlyCreatedUser = new User({
        username,
        email,
        password: hashedPassword,
        role: role || "user",
      });
  
      await newlyCreatedUser.save();
  
      if (newlyCreatedUser) {
        res.status(201).json({
          success: true,
          message: "User registered successfully!",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Unable to register user! please try again.",
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
    const { username, password } = req.body;

    //find if the current user is exists in database or not
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User doesn't exists`,
      });
    }

    //if the password is correct or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    //create user token
    const accessToken = jwt.sign(
        {
          userId: user._id,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30m",
        }
      );

      res.status(200).json({
        success: true,
        message: "Logged in successful",
        accessToken,
      });
    }
   catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

// controller to change the password

const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userId;

    //extract old and new password;
    // first find the old password and then find new password set by the user
    const { oldPassword, newPassword } = req.body;

    //find the current logged in user
    // then find the current login user because only auth user can change the password
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //check if the old password is correct
    // after that check the old password that have provided by the user is correct or not
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is not correct! Please try again.",
      });
    }
     //hash the new password here
     // then again hash the new password before storing it into our database
     const salt = await bcrypt.genSalt(10);
     const newHashedPassword = await bcrypt.hash(newPassword, salt);
 
     //update user password
     // after that update the password with new password
     user.password = newHashedPassword;
     await user.save();
 
     res.status(200).json({
       success: true,
       message: "Password changed successfully",
     });
   } catch (e) {
     console.log(e);
     res.status(500).json({
       success: false,
       message: "Some error occured! Please try again",
     });
   }
 };
 
 module.exports = { registerUser, loginUser, changePassword };

   

