import express from "express";
import {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutsController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET all workouts + a single workout & POST  a new workout
router.route("/").get(protect, getAllWorkouts).post(protect, createWorkout);

// DELETE  a new workout & UPDATE  a new workout
router
  .route("/:id")
  .get(protect, getSingleWorkout)
  .delete(protect, deleteWorkout)
  .put(protect, updateWorkout);

export default router;
