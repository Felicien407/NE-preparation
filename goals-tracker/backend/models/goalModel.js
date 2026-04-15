const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a text field"],
    },
  },
  {
    timestamps: true,
  },
);

const goal = mongoose.model("Goal", goalSchema);
module.exports = goal;
