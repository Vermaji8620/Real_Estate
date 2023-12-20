import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json()); //  req. k body se directly data nai fetch kr skte to isiliye middleware lagana padta hai

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

//  middleware for handling the errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("connected to database"))
  .catch((error) => console.log(error));
app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
