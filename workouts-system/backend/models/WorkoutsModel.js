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
      required: true,
      min: 1,
    },
    load: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Workout", workoutSchema);
