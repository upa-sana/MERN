import express from "express";
import * as controller from "../controllers/product.controller.js";
import { protactedRoute } from "../middleware/token.handler.js";

export const router = express.Router();
router
  .route("/")
  .get(controller.getProduct)
  .post(protactedRoute, controller.addProduct);
router
  .route("/:productId")
  .get(controller.getProductbyId)
  .put(protactedRoute, controller.updateProduct)
  .delete(protactedRoute, controller.removeProduct);
router.route("/:productId/add-category").put(controller.addProductCategory);
router.route("/category/:categoryName").get(controller.getProductByCategory);
