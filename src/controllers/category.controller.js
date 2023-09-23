import asyncHandler from "express-async-handler";
import * as services from "../services/category.service.js";

export const getCategory = asyncHandler(async (req, res) => {
  const category = await services.findCategory();
  res.status(200).json({ category: "Category List", data: category });
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const categoryId = req.params.categoryId;
  const category = await services.findCategoryById(categoryId);
  res
    .status(200)
    .json({ message: `category with ${categoryId}`, data: category });
});

// post category
export const addCategory = asyncHandler(async (req, res) => {
  const newCategory = req.body;
  newCategory.image = req.file;
  const category = await services.createCategory(newCategory);

  res
    .status(201)
    .json({ message: "category created successfully!", data: category });
});

// update category
export const updateCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.categoryId;
  const category = await services.putCategory(categoryId, req.body);
  res.status(200).json({ message: "Data updated successfully!", category });
});

// delete category
export const removeCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.categoryId;
  const category = await services.deleteCategory(categoryId);
  res.status(200).json({ message: "Data deleted successfully!", category });
});
