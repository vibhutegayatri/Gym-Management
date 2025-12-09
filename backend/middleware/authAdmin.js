// middleware/authAdmin.js
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

const protectAdmin = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Admin.findById(decoded.id).select("-password");
      if (!req.admin) return res.status(401).json({ message: "Not authorized" });
      next();
    } catch (err) {
      return res.status(401).json({ message: "Token invalid or expired" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

export default protectAdmin;
