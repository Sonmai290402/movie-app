import { User } from "../models/user.model.js";

export async function attachUser(req, res, next) {
  if (!req.auth || !req.auth.userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const mongoUser = await User.findOne({ clerkId: req.auth.userId });

  if (!mongoUser) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  req.mongoUser = mongoUser; // Gán user MongoDB vào request
  next();
}
