import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Required"],
  },
  price: {
    type: Number,
    required: [true, "Required"],
  },
  description: String,
  productImage: {
    type: Buffer,
    required: [true, "Product image is required"],
  },
  feature: {
    type: [
      {
        featureName: String,
        featureDesc: String,
      },
    ],
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

export const Product = mongoose.model("Product", productSchema);
