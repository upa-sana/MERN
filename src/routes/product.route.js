import express from "express";
import multer from "multer";
import * as controller from "../controllers/product.controller.js";
import pagination from "../middleware/page.handler.js";
import { protactedRoute } from "../middleware/token.handler.js";
import { Product } from "../model/product.schema.js";
const storage = multer.memoryStorage();
const upload = multer({ storage });
export const router = express.Router();
console.log("product modal", Product);
router
  .route("/")
  .get(pagination(Product, "product"), controller.getProduct)
  .post(protactedRoute, upload.single("productImage"), controller.addProduct);
router
  .route("/:productId")
  .get(controller.getProductbyId)
  .put(protactedRoute, controller.updateProduct)
  .delete(protactedRoute, controller.removeProduct);
router.route("/:productId/add-category").put(controller.addProductCategory);
router.route("/category/:categoryName").get(controller.getProductByCategory);
