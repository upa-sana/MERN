import express from "express";
import * as controller from "../controllers/category.controller.js";
import { checkBodyRequest } from "../middleware/request-body.handler.js";

export const router = express.Router();
router
  .route("/")
  .get(controller.getCategory)
  .post(checkBodyRequest, controller.addCategory);
router
  .route("/:categoryId")
  .get(controller.getCategoryById)
  .put(checkBodyRequest, controller.updateCategory)
  .delete(controller.deleteCategory);
