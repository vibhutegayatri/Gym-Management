


import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  product: { type: String, required: true },
  amount: { type: String, required: true },
  trainer: { type: String, default: "Not Assigned" }, // string to avoid [object Object]
  duration: { type: Number, default: 1 }, // number of months
  paymentMethod: { type: String, default: "Online (QR)" },
  paymentStatus: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
