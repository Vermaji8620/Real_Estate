// yaha pe khali token ko verify krrhe hai..

import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyUser = (req, res, next) => {
  // yaha pe cookie pe se data lana hoga...to cookie-parser use karna padega
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "unauthorized"));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(401, "unauthorized"));
    // yaha pe pehle wala user ek variable hai...aur baad wala user ek data hai jo verify karne k baad aaya hai
    req.user = user;
    // yaha pe req.user me user ka data aa gaya hoga...to ab isko use kar skte hai authentication k liye
    // iske baad next() call karna padega...taki route ka next middleware call ho sake...jo user.route me likhe hai
    next();
  });
};
