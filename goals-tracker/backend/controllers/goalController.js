const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel.js");
const User = require("../models/userModel.js");

// @desc   get goals
// route   GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

// @desc   get single goal
// route   GET /api/goals
// @access Private
const getSingleGoal = asyncHandler(async (req, res) => {

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid goal ID");
  }
  const goal = await Goal.findById(id);

  checkAccess(req, res, goal);

  res.status(200).json(goal);
});

// @desc   set goals
// route   POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please setup the text field.");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(201).json(goal);
});

// @desc   update goals
// route   UPDATE /api/goals
// @access Private
const updateGoal = asyncHandler(async (req, res) => {

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid goal Id");
  }
  const goal = await Goal.findById(id);

  checkAccess(req, res, goal);

  const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json(updatedGoal);
});

// @desc   delete goals
// route   DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid goal Id");
  }

  const goal = await Goal.findById(id);

  checkAccess(req, res, goal);

  await Goal.findByIdAndDelete(id);

  res.status(200).json({ id: id });
});

const checkAccess = (req, res, goal) => {

  // check for User
  if (!req.user) {
    res.status(401);
    throw new Error("User not found!");
  }

  // check for goal
  if (!goal){
    res.status(404)
    throw new Error("Goal not found")
  }

  // make sure logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User not authorized");
  }
};

module.exports = {
  getGoals,
  getSingleGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
