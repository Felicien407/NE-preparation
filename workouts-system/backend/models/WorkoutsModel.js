import mongoose from "mongoose";

const Schema = mongoose.Schema;

// schema
const workoutSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    reps: {
      type: Number,
      required: [true, "Reps is required"],
      min: [1, "Reps must be at least 1"],
    },
    load: {
      type: Number,
      required: [true, "Load is required"],
      min: [0, "Load cannot be negative"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Workout", workoutSchema);
