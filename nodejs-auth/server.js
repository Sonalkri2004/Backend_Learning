require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const authRoutes = require("./routes/auth-routes");
const homeRoutes = require("./routes/home-routes");


const app = express();
const PORT = process.env.PORT || 3000;

connectToDB();

//Middlewares
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);

app.listen(PORT, () => {
    console.log(`Server is now listeining to PORT ${PORT}`);
  });