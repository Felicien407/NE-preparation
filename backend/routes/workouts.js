import express from "express"
import {getAllWorkouts, getSingleWorkout, createWorkout, deleteWorkout, updateWorkout} from "../controllers/workoutsController.js"

const router = express.Router()

// GET all workouts
router.get('/', getAllWorkouts)

// GET a single workout
router.get('/:id', getSingleWorkout)

// POST  a new workout
router.post('/', createWorkout)

// DELETE  a new workout
router.delete('/:id', deleteWorkout)

// UPDATE  a new workout
router.patch('/:id', updateWorkout)

export default router