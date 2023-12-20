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

export const google = async (req, res, next) => {
  try {
    let userr = await User.findOne({
      email: req.body.email,
    });
    if (userr) {
      // iska matlb hai ki user mil gaya hai hmko datbase k andar.. to ab usko authenticate krna hoga---
      const token = jwt.sign(
        {
          id: userr._id,
        },
        process.env.JWT_SECRET
      );
      const usercopy = userr.toObject();
      delete usercopy.password;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(usercopy)
        .status(200);
    } else {
      // iska matlb naya user register krna pdega
      // yaha pe paassword generate krna hoga randomly coz model k andar password required pe set hai and google se authenticate krne k time pe to password lagta hi nai hai...to kaise v to password lana hoga..and usko uniquie krna hoga...
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = await User({
        // ho sakta hai ki bohot sare users ka same name ho sabko alag to krna hoga ..to username to alag hona chahiye na...jaise user model me defined hai...to alag krne k liye...
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString().slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign(
        {
          id: newUser._id,
        },
        process.env.JWT_SECRET
      );
      const newUserCopy = newUser.toObject();
      delete newUserCopy.password;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(newUserCopy);
    }
  } catch (error) {
    next(error);
  }
};
