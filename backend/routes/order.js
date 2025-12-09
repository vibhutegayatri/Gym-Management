

import express from "express";
import Order from "../models/order.js";

const router = express.Router();

// 🔹 Save Payment Data
router.post("/", async (req, res) => {
  try {
    const { name, email, product, amount, paymentMethod, trainer, duration } = req.body;

    if (!name || !email || !product || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({
      name,
      email,
      product,
      amount,
      paymentMethod,
      trainer,       // ✅ added
      duration,      // ✅ added
      paymentStatus: "Success",
    });

    await newOrder.save();
    res.status(201).json({ message: "✅ Payment saved successfully", order: newOrder });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
});

// 🔹 Fetch all orders of a user by email
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "❌ Error fetching orders", error: err.message });
  }
});

export default router;
