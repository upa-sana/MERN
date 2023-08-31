import mongoose from "mongoose";
const prroductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Required"],
  },
  price: {
    type: Number,
    required: [true, "Required"],
  },
  createdDate: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },
});

export const Product = mongoose.model("Product", prroductSchema);
