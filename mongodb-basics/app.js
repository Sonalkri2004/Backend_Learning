
// step 1 include the mongoose module in our project
const mongoose = require("mongoose");

// step 2 connect to database

mongoose
  .connect(
    "mongodb+srv://sonalkumari000555:qBfW282NN9nMLBSR@cluster0.zbqwu.mongodb.net/"
  )
  .then(() => console.log("database connected successfully"))
  .catch((e) => console.log(e));


  // step 3 make a required schema acc to our project requirement

  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: { type: Date, default: Date.now },
  });