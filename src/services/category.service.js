import { Category } from "../model/category.schema.js";
// using the async await keyword for the same  code in different function does it impact on the performance
export const findCategory = async (product) => {
  return await Category.find();
};

export const findCategoryById = async (categoryId) => {
  return await Category.findById(categoryId);
};

export const createCategory = async (requestBody) => {
  const product = new Category(requestBody);
  await product.save();
  return product;
};

export const putCategory = async (categoryId, requestBody) => {
  const product = await Category.findById(categoryId);
  product.name = requestBody.name ? requestBody.name : product.name;
  product.price = requestBody.price ? requestBody.price : product.price;
  product.desc = requestBody.desc ? requestBody.desc : product.desc;
  product.save();
  return product;
};

export const deleteCategory = async (categoryId) => {
  return await Category.deleteOne({ _id: categoryId });
};
