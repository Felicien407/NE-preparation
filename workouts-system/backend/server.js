import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import errorHandler from "./middlewares/errorMiddleware.js";

import workoutRoutes from "./routes/workouts.js";
import userRoutes from "./routes/users.js";

const app = express();

const port = process.env.PORT;
const MONGO = process.env.MONGO_URI;

// middlewares
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/auth", userRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "OOPs! Page not found",
  });
});

app.use(errorHandler);

// database connection
mongoose
  .connect(MONGO)
  .then(() => {
    // server creation
    app.listen(port, () => {
      console.log(
        `Connected to db & listening on port http://localhost:${port}`,
      );
    });
  })
  .catch((error) => {
    console.log("Error connecting database: ", error.message);
  });
