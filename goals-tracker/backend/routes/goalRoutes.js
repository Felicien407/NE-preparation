const express = require("express");
const {
  getGoals,
  getSingleGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController.js");
const protect = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.route("/").get(protect, getGoals).post(protect, setGoal);
router
  .route("/:id")
  .get(protect, getSingleGoal)
  .delete(protect, deleteGoal)
  .put(protect, updateGoal);

module.exports = router;
