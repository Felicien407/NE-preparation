import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register user
export const registerUser = asyncHandler(async (req, res) => {
  const { names, email, password } = req.body;
  if (!names || !email || !password) {
    res.status(400);
    throw new Error("Please complete all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    names,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: user.id,
      names: user.names,
      email: user.email,
      token: generateToken(user._id),
    },
  });
});

// Login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please complete all fields");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found (Please register)");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid password");
  }

  res.status(200).json({
    success: true,
    message: "User login successful",
    user: {
      id: user.id,
      names: user.names,
      email: user.email,
      token: generateToken(user._id),
    },
  });
});

// Get user data (testing)
export const getMe = asyncHandler(async (req, res) => {
  if(!req.user){
    res.status(401)
    throw new Error("User not authorized")
  }
  res.status(200).json(req.user);
});
