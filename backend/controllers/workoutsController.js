import mongoose from "mongoose"
import Workout from "../models/WorkoutsModel.js"

// GET all workouts
export const getAllWorkouts = async(req, res)=>{
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// GET a single workout
export const getSingleWorkout = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout!"})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(400).json({error: "No such workout!"})
    }

    res.status(200).json(workout)
}

// CREATE a new workouts
export const createWorkout = async (req,res)=>{
    const {title, reps, load} = req.body

    let emptyFields = []

    if(!title) emptyFields.push('title')
    if(!load) emptyFields.push('load')
    if(!reps) emptyFields.push('reps')

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all fields.', emptyFields})
    }

    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a single workout
export const deleteWorkout = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout!"})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(400).json({error: "No such workout!"})
    }

    return res.status(200).json(workout)
}

// UPDATE a single workout
export const updateWorkout = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout!"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout){
        return res.status(400).json({error: "No such workout!"})
    }

    return res.status(200).json(workout)
}

// export default {getAllWorkouts, getSingleWorkout, createWorkout, deleteWorkout, updateWorkout}