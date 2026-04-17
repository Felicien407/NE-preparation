import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    names: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "User already exists."],
    },
    password: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
