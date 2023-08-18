import express from "express";
import * as controller from "../controllers/product.controller.js";
import { checkBodyRequest } from "../middleware/request-body.handler.js";

export const router = express.Router();
router
  .route("/")
  .get(controller.getProduct)
  .post(checkBodyRequest, controller.addProduct);
router
  .route("/:productId")
  .get(controller.getProductbyId)
  .put(checkBodyRequest, controller.updateProduct)
  .delete(controller.deleteProduct);
router.route("/:productId/add-category").put(controller.addProductCategory);
