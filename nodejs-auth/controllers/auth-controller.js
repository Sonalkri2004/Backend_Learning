

//register controller
const registerUser = async (req, res) => {
  try {

     //extract user information from our request body
     const { username, email, password, role } = req.body;
   
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