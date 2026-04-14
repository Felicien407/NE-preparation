import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected.');
    } catch (error) {
        console.log('MongoDB connection failed: ', error.message)
        // help to exit this statement for preventing further unncessary reloads.
        process.exit(1);
    }
}

export default connectDB;