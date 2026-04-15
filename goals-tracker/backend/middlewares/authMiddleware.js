const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");

const private = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // get user from request
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        res.status(401);
        throw new Error("User not found");
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, Token failed");
    }
  } else {
    res.status(403);
    throw new Error("Not Authorized!");
  }
});

module.exports = private;
