import express from "express";
import * as controller from "../controllers/category.controller.js";

export const router = express.Router();
router.route("/").get(controller.getCategory).post(controller.addCategory);
router
  .route("/:categoryId")
  .get(controller.getCategoryById)
  .put(controller.updateCategory)
  .delete(controller.deleteCategory);
