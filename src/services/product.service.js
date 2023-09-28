import { Category } from "../model/category.schema.js";
import { Product } from "../model/product.schema.js";
import { ErrorResponse } from "../utils/error.response.js";
// using the async await keyword for the same  code in different function does it impact on the performance
export const findProducts = async (product) => {
  return await Product.find().populate([
    "category",
    {
      path: "category",
      select: "categoryName",
    },
  ]);
  // .where("price")
  // .gte(50000)
  // .lte(60000);
};

export const findProductById = async (productId) => {
  return await Product.findById(productId);
};

export const createProduct = async (requestBody) => {
  const { name, price, description, category, image } = requestBody;
  const product = new Product({
    name,
    price,
    description,
    category,
    productImage: image ? image.buffer : undefined,
  });

  // const product = new Product(requestBody);
  await product.save();
  return product;
};

export const putProduct = async (productId, requestBody) => {
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

export const createProductCategory = async (productId, categoryName) => {
  if (!categoryName) {
    throw new ErrorResponse("Invalid request body", 400);
  }
  const product = await Product.findById(productId);
  if (!product) {
    throw new ErrorResponse(`Product with id ${productId} don't exist`, 404);
  }

  const category = await Category.findOne({ categoryName });
  if (!category) {
    throw new ErrorResponse(
      `category with name ${categoryName} don't exist`,
      404
    );
  }
  product.category = category.id;
  product.save();
  return product;
};

//.where("name").equals(categoryName);
export const findProductByCategory = async (categoryName, request) => {
  let query = {};
  const { sort } = request.query;
  console.log("sorting value", sort);

  const category = await Category.findOne({ categoryName });
  if (!category) {
    throw new ErrorResponse(`this category don't exist`, 404);
  }

  query.category = category._id;

  if (request.query.name) {
    query.name = product.query.name;
  }
  if (request.query.price) {
    query.price = product.query.price;
  }

  if (sort) {
    return await Product.find(query).sort({ price: sort });
  }
  const product = await Product.find(query);

  if (!product) {
    throw new ErrorResponse(
      `Product with ${categoryName} category don't exist`,
      404
    );
  }

  return product;
};
