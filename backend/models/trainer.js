// models/trainer.js
import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String },
  desc: { type: String },
  phone: { type: String },
  email: { type: String },
  experience: { type: String },
  price: { type: String },
}, { timestamps: true });

const Trainer = mongoose.models.Trainer || mongoose.model("Trainer", trainerSchema);
export default Trainer;
