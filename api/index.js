import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("This is the home ");
});

app.get("/about", (req, res) => {
  res.send("This is the about page");
});

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("connected to database"))
  .catch((error) => console.log(error));
app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
