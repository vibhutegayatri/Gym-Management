import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/admin.js"; // path verify कर (adminModel.js असेल तर तसा दे)

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gymdb");
  await Admin.deleteOne({ username: "admin" });

  // No manual hash here 👇
  const admin = new Admin({ username: "admin", password: "admin123" });
  await admin.save();

  console.log("✅ Admin created successfully (admin/admin123)");
  mongoose.disconnect();
};

run().catch((err) => {
  console.error("❌ Error creating admin:", err);
  process.exit(1);
});
