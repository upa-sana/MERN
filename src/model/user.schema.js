import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Required"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Required"],
    lowercase: true,
    match: new RegExp("[a-zA-z0-9.]+@[a-z].[a-z]{2,3}"),
    unique: true,
  },
  mobile: {
    type: Number,
    required: [true, "Required"],
    match: new RegExp("[7-9]{2}[0-9]{8}"),
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", userSchema);
