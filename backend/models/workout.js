// models/workout.js
import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String },
  time: { type: String },
  level: { type: String },
  trainer: {
    name: String,
    email: String,
    phone: String,
  },
  price: { type: String },
  description: { type: String },
  focus: { type: String },
}, { timestamps: true });

const Workout = mongoose.models.Workout || mongoose.model("Workout", workoutSchema);
export default Workout;
