import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Workout from "../models/WorkoutsModel.js";

// GET all workouts
export const getAllWorkouts = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
});

// CREATE a new workouts
export const createWorkout = asyncHandler(async (req, res) => {
  const { title, reps, load } = req.body;
  if (!title || !reps || !load) {
    res.status(400);
    throw new Error("Please complete all fields");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  const workout = await Workout.create({
    user: req.user.id,
    title,
    reps,
    load,
  });
  res.status(200).json(workout);
});

// GET a single workout
export const getSingleWorkout = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const workout = await verifyAccess(req, res, id);
  res.status(200).json(workout);
});

// DELETE a single workout
export const deleteWorkout = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const workout = await verifyAccess(req, res, id);
  await workout.deleteOne();

  return res.status(200).json({
    workout_id: workout._id,
  });
});

// UPDATE a single workout
export const updateWorkout = asyncHandler(async (req, res) => {
  const { title, reps, load } = req.body;
  if (!title || !reps || !load) {
    res.status(400);
    throw new Error("Please complete all fields");
  }
  const { id } = req.params;

  verifyAccess(req, res, id);

  const workout = await Workout.findOneAndUpdate(
    { _id: id, user: req.user.id },
    { ...req.body },
  );

  return res.status(200).json(workout);
});

const verifyAccess = async (req, res, id) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid workout id");
  }
  const workout = await Workout.findOne({ _id: id, user: req.user.id });
  if (!workout) {
    res.status(404);
    throw new Error("No such workout!");
  }
  return workout;
};

export default {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
