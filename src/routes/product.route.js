import express from "express";
import * as controller from "../controllers/product.controller.js";

export const router = express.Router();
router.route("/").get(controller.getProduct).post(controller.addProduct);
router
  .route("/:productId")
  .get(controller.getProductbyId)
  .put(controller.updateProduct)
  .delete(controller.removeProduct);
router.route("/:productId/add-category").put(controller.addProductCategory);
router.route("/category/:categoryName").get(controller.getProductByCategory);
