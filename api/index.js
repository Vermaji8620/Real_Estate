import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
dotenv.config();
const app = express();

app.use("/api/user", userRouter);

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("connected to database"))
  .catch((error) => console.log(error));
app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
