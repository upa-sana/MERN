import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Required"],
    lowercase: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: [true, "Requires"],
    capitalize: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Category = mongoose.model("Category", categorySchema);
