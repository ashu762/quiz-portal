import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
// @desc Get /api/user/:id
// Public
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("User not Found!");
  }
});
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist!");
  }
  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      id: user._id,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data!");
  }
});

// @desc Authenticate user & get token
// @route POST /api/users/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid error or password");
  }
});
