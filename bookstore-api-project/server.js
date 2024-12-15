
// step 1 
require("dotenv").config();
const express = require("express");
const connectToDB= require("./database/db");

const app = express();

const PORT = process.env.PORT || 3000;

//step 2 connect to our database
   connectToDB();


//middleware -> express.json()
app.use(express.json());



app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});