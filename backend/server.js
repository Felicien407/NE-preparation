import express from "express"
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
import cors from "cors"

import workoutRoutes from "./routes/workouts.js"

const app = express()

const port = process.env.PORT
const MONGO = process.env.MONGO_URI

// middlewares
app.use(express.json())
app.use(cors())

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

// API routes
app.use('/api/workouts', workoutRoutes)

// database connection
mongoose.connect(MONGO)
    .then(()=>{
        // server creation
        app.listen(port, () => {
            console.log(`Connected to db & listening on port http://localhost:${port}`)
        })
    })
    .catch((error)=>{
        console.log("Error connecting database: ", error.message)
    })