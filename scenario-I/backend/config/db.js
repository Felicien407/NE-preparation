import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const dbConnect = async ()=>{
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`✔️  Host: ${conn.connection.host}`);
    } catch (error) {
        console.log('DB connection error: ', error);
        process.exit(1);
    }
}

export default dbConnect;