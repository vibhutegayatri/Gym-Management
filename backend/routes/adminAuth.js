// routes/adminAuth.js
import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

const router = express.Router();

// POST /api/admin/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, username: admin.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
