import { Product } from "../model/product.schema.js";
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

export const putProduct = async (req, res) => {
  const productId = req.params.productId;
  const requestBody = req.body;
  // console.log(requestBody);
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: `product doesn't exist!` });
  }

  product.name = requestBody.name ? requestBody.name : product.name;
  product.price = requestBody.price ? requestBody.price : product.price;
  product.save();
  return product;
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  const product = await Product.deleteOne({ _id: productId });
  console.log(product, "service");
  if (product.deletedCount === 1) {
    return product;
  } else {
    res.status(400).json({ message: `bad request` });
  }
};
