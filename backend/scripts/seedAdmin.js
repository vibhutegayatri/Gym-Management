// scripts/seedAdmin.js
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Admin from "../models/admin.js";

dotenv.config();
const run = async () => {
  await connectDB();
  const exists = await Admin.findOne({ username: "admin@gmail.com" });
  if (exists) {
    console.log("Admin already exists");
    process.exit(0);
  }
  const admin = new Admin({ username: "admin@gmail.com", password: "Admin@123" });
  await admin.save();
  console.log("Admin created: admin@gmail.com / Admin@123");
  process.exit(0);
};

run().catch((err) => { console.error(err); process.exit(1); });
