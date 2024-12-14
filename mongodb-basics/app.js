const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://sonalkumari000555:qBfW282NN9nMLBSR@cluster0.zbqwu.mongodb.net/"
  )
  .then(() => console.log("database connected successfully"))
  .catch((e) => console.log(e));
