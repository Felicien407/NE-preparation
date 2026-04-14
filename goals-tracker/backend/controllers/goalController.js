const asyncHandler = require("express-async-handler");

// @desc   get goals
// route   GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get goals" });
});

// @desc   set goals
// route   POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.goal) {
    res.status(400);
    throw new Error("Please setup the goal field.");
  }
  console.log(req.body.goal);
});

// @desc   update goals
// route   UPDATE /api/goals
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
});

// @desc   delete goals
// route   DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get goals" });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
