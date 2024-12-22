require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");


const app = express();

//connect to our database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected successfully"))
  .catch((e) => console.log(e));

//use middlewares
app.use(express.json());



app.listen(process.env.PORT, () => {
  console.log(`Server is now running on port ${process.env.PORT}`);
});