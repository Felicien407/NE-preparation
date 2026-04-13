import express from "express"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express()

// middlewares
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.json("API is running...")
})

// 404 handler
app.use((req, res) =>{
    res.status(404).json({
        success: false,
        message: "Route not found."
    });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})