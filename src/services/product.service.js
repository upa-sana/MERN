import { Product } from "../model/product.schema.js";
// using the async await keyword for the same  code in different function does it impact on the performance
export const findProducts = async (product) => {
  return await Product.find()
    .populate("category", {
      path: "category",
      select: "displayName",
    })
    .where("category")
    .gte(50000)
    .lte(60000);
};

export const findProductById = async (productId) => {
  return await Product.findById(productId);
};

export const createProduct = async (requestBody) => {
  const product = new Product(requestBody);
  await product.save();
  return product;
};

export const putProduct = async (productId, requestBody) => {
  const product = await Product.findById(productId);
  product.name = requestBody.name ? requestBody.name : product.name;
  product.price = requestBody.price ? requestBody.price : product.price;
  product.desc = requestBody.desc ? requestBody.desc : product.desc;
  product.save();
  return product;
};

export const deleteProduct = async (productId) => {
  return await Product.deleteOne({ _id: productId });
};
