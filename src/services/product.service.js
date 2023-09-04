import { Product } from "../model/product.schema.js";
import { ErrorResponse } from "../utils/error.response.js";
// using the async await keyword for the same  code in different function does it impact on the performance
export const findProducts = async (product) => {
  return await Product.find()
    .populate("category", {
      path: "category",
      select: "displayName",
    })
    .where("price")
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
  // console.log(requestBody);
  const product = await Product.findById(productId);
  const { name, price } = requestBody;
  if (!name || !price) {
    throw new ErrorResponse("Invalid requst body", 400);
  }
  if (!product) {
    //res.status(404).json({ message: `product doesn't exist!` });
    throw new ErrorResponse(`product with id ${productId} doesn't exist!`, 404);
  }

  product.name = requestBody.name ? requestBody.name : product.name;
  product.price = requestBody.price ? requestBody.price : product.price;
  product.save();
  return product;
};

export const deleteProduct = async (productId) => {
  const product = await Product.deleteOne({ _id: productId });

  if (product.deletedCount === 1) {
    return product;
  } else {
    throw ErrorResponse(
      `Product with id ${productId} not found to delete`,
      400
    );
  }
};

export const createProductCategory = async (productId, requestBody) => {
  //  i need product id to serch the product weather it exist or not
  //  I need to pass the request body with product category name check for the request body
  //  add the category name to the product
  const { categoryName } = requestBody;
  if (!categoryName) {
    throw ErrorResponse("Invalid request body", 400);
  }
  const product = await Product.findById(productId);
  if (!product) {
    throw ErrorResponse(`Product with id ${productId} don't exist`, 404);
  }

  product = {
    ...product,
    categoryName,
  };

  product.save();
  return product;
};

// QN - Service and controller management : role separation
