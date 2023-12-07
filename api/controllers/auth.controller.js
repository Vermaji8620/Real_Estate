import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashpassword = bcryptjs.hashSync(password, 10); //  hashsync use krna se await lagane ka koi jarurat nai hai kyunki ye synchronous function hai
    const newUser = new User({ username, email, password: hashpassword });
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "user created successfully",
      user: savedUser,
    });
  } catch (error) {
    next(error);
  }
};
