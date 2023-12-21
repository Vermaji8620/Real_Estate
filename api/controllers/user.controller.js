import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({
    message: "hello world",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can just only update your account"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    // yaha pe new: true isliye likha hai...taki updatedUser me updated data aa jaye
    // yah pe tak user update ho chuka hai...ab isko save karna padega and return karna padega
    await updatedUser.save();
    const copyUpdatedUser = updatedUser.toObject();
    delete copyUpdatedUser.password;
    res.status(200).json(copyUpdatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can just only delete your own account"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearcookie("token");
    res.status(200).json({
      message: "user deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
