
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


  // step 3 create user model 
const User = mongoose.model("User", userSchema);


async function runQueryExamples() {
    try {
      //create a new user using create method
      const newUser = await User.create({
        name: "Updated User",
        email: "updated@gmail.com",
        age: "75",
        isActive: true,
        tags: ["developer"],
      });

 // another way to create user into our db
    //   const newUser1 = new User({
    //       name: "Raj Mukherjee",
    //       email: "raj@gmail.com",
    //       age: "40",
    //       isActive: true,
    //       tags: ["developer", "designer", "manager"],
    //     });
    //     await newUser1.save();



      console.log("Created new user", newUser);


      // get all user from the db

      const allUser= await User.find();
      console.log("all user are:", allUser);

      // get a user who satisfied the condition

      const getUserOfActiveFalse = await User.find({ isActive: true });
      console.log(getUserOfActiveFalse);

      // delete a user from the db

      const deletedUser = await User.findByIdAndDelete(newUser._id);
      console.log("deleted user ->", deletedUser);
      
    }
    catch (e) {
        console.log("Error ->", e);
      } finally {
        await mongoose.connection.close();
      }
    }
    
    runQueryExamples();