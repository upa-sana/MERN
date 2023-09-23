import express from "express";
import multer from "multer";
import * as controller from "../controllers/category.controller.js";
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const router = express.Router();
router
  .route("/")
  .get(controller.getCategory)
  .post(upload.single("featureImage"), controller.addCategory);
router
  .route("/:categoryId")
  .get(controller.getCategoryById)
  .put(controller.updateCategory)
  .delete(controller.removeCategory);
