import express from "express";
import {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutsController.js";

const router = express.Router();

// GET all workouts + a single workout & POST  a new workout
router.route("/").get(getAllWorkouts).post(createWorkout);

// DELETE  a new workout & UPDATE  a new workout
router
  .route("/:id")
  .get(getSingleWorkout)
  .delete(deleteWorkout)
  .put(updateWorkout);

export default router;
