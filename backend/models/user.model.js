import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  searchHistory: {
    type: Array,
    default: [],
  },
});

export const User = mongoose.model("User", userSchema);
