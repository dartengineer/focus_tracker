const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly"],
      default: "daily",
    },
    streakCount: {
      type: Number,
      default: 0,
    },
    lastCompleted: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", habitSchema);




// Fields:
// title
// frequency (daily / weekly)
// streakCount
// user (reference)
// createdAt