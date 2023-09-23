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
    required: [true, "Required"],
    capitalize: true,
  },

  featureImage: {
    type: Buffer,
    required: [true, "Feature image is required"],
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
