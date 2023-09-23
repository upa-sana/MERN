import express from "express";
import multer from "multer";
import * as controller from "../controllers/product.controller.js";
import { protactedRoute } from "../middleware/token.handler.js";
const storage = multer.memoryStorage();
const upload = multer({ storage });
export const router = express.Router();
router
  .route("/")
  .get(controller.getProduct)
  .post(protactedRoute, upload.single("productImage"), controller.addProduct);
router
  .route("/:productId")
  .get(controller.getProductbyId)
  .put(protactedRoute, controller.updateProduct)
  .delete(protactedRoute, controller.removeProduct);
router.route("/:productId/add-category").put(controller.addProductCategory);
router.route("/category/:categoryName").get(controller.getProductByCategory);
