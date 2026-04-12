import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/user.route.js";
import dbConnect from "./config/db.js";;

dotenv.config();
const PORT = process.env.PORT;

const app = express()

app.use(cors());
app.use(express.json());

app.use('/api/auth', router);

dbConnect()
    .then(()=>{
        app.listen(PORT, ()=>{
        try {
            console.log(`DB connected & SERVER is running on ${PORT}`)
        } catch (error) {
            console.log('Server run error', error)
        }
        });  
    })