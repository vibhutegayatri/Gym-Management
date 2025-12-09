

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/order.js";

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



// // backend/server.js  (relevant parts; integrate into your file)
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";

// // existing imports you likely have
// import adminRoutes from "./routes/adminRoutes.js";        // public admin routes: /api/users ...
// import adminAuthRoutes from "./routes/adminAuth.js";     // login: /api/admin/login
// import adminCrud from "./routes/adminCrud.js";           // protected admin CRUD routes (workouts, trainers, orders, ...)

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// // connect DB (if you have a separate function, keep it)
// mongoose
//   .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gymdb")
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("MongoDB connection error:", err));

// // mount routers
// app.use("/api", adminRoutes);          // /api/users etc (public)
// app.use("/api/admin", adminAuthRoutes); // /api/admin/login (auth)
// app.use("/api/admin", adminCrud);      // ← ADD THIS: protected admin CRUD endpoints

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
