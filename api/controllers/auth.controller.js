import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "user not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    const copyValidUser = validUser.toObject();
    delete copyValidUser.password;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(copyValidUser);
  } catch (error) {
    next(error);
  }
};
