import { Category } from "../model/category.schema.js";
import { ErrorResponse } from "../utils/error.response.js";
// using the async await keyword for the same  code in different function does it impact on the performance
export const findCategory = async (category) => {
  return await Category.find();
};

export const findCategoryById = async (categoryId) => {
  return await Category.findById(categoryId);
};

export const createCategory = async (requestBody) => {
  const { categoryName, displayName, image } = requestBody;

  const category = new Category({
    categoryName,
    displayName,
    featureImage: image ? image.buffer : undefined,
  });

  await category.save();
  return category;
};

export const putCategory = async (categoryId, requestBody) => {
  const { categoryName, displayName } = requestBody;
  if (!categoryName || !displayName) {
    throw new ErrorResponse(`Invalid request body`, 400);
  }
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ErrorResponse(`Category with id ${categoryId} don't exist`);
  }
  category.categoryName = categoryName ? categoryName : category.name;
  category.displayName = displayName ? displayName : category.price;
  category.save();
  return category;
};

export const deleteCategory = async (categoryId) => {
  const category = await Category.deleteOne({ _id: categoryId });
  if (category.deletedCount === 1) {
    return category;
  } else {
    throw new ErrorResponse(`Category with id ${categoryId} don't exist`);
  }
};
