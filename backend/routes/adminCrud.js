// routes/adminCrud.js
import express from "express";
import protectAdmin from "../middleware/authAdmin.js";
import Workout from "../models/workout.js";
import Trainer from "../models/trainer.js";
import User from "../models/user.js";
import Order from "../models/order.js";

const router = express.Router();

// protect all routes
router.use(protectAdmin);

// WORKOUTS
router.get("/workouts", async (req, res) => {
  try { res.json(await Workout.find().sort({ createdAt: -1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});
router.post("/workouts", async (req, res) => {
  try { const created = await Workout.create(req.body); res.status(201).json(created); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
router.put("/workouts/:id", async (req, res) => {
  try { const updated = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(updated); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
router.delete("/workouts/:id", async (req, res) => {
  try { await Workout.findByIdAndDelete(req.params.id); res.json({ message: "Workout deleted" }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

// TRAINERS
router.get("/trainers", async (req, res) => {
  try { res.json(await Trainer.find().sort({ createdAt: -1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});
router.post("/trainers", async (req, res) => {
  try { const t = await Trainer.create(req.body); res.status(201).json(t); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
router.put("/trainers/:id", async (req, res) => {
  try { const u = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(u); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
router.delete("/trainers/:id", async (req, res) => {
  try { await Trainer.findByIdAndDelete(req.params.id); res.json({ message: "Trainer deleted" }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

// USERS (read-only)
router.get("/users", async (req, res) => {
  try { const users = await User.find().select("-password").sort({ createdAt: -1 }); res.json(users); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

// ORDERS / PAYMENTS
router.get("/orders", async (req, res) => {
  try { const orders = await Order.find().sort({ createdAt: -1 }); res.json(orders); }
  catch (err) { res.status(500).json({ message: err.message }); }
});
router.get("/orders/:id", async (req, res) => {
  try { const o = await Order.findById(req.params.id); res.json(o); }
  catch (err) { res.status(404).json({ message: err.message }); }
});
router.put("/orders/:id", async (req, res) => {
  try { const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(updated); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
router.delete("/orders/:id", async (req, res) => {
  try { await Order.findByIdAndDelete(req.params.id); res.json({ message: "Order deleted" }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

export default router;
