import * as data from "../model/data.js";

const productList = JSON.parse(JSON.stringify(data.products));

// get all product
export const getProduct = (req, res) => {
  res.status(200).json({ message: "product list", data: productList });
};

// get product by id
export const getProductbyId = (req, res) => {
  const productId = req.params.productId;
  if (!productId) {
    return res.status(400).json({ errorMessage: "Bad Request!" });
  }

  const productIndex = productList.findIndex((item) => item.id === productId);
  if (productIndex === -1) {
    return res
      .status(404)
      .json({ message: `Product with id ${productId} don't exist.` });
  }

  res.status(200).json({ message: "Product", data: productList[productIndex] });
};

// add pproduct
export const addProduct = (req, res) => {
  const { name, price, desc } = req.body;
  if (!name || !price || !desc) {
    return res
      .status(400)
      .json({ message: "Bad Request! missing body request" });
  }

  const newProduct = req.body;
  newProduct.id = productList.length++;
  productList.push(newProduct);

  res
    .status(200)
    .json({ message: "Product added successfully!", data: productList });
};

// update prduct
export const updateProduct = (req, res) => {
  const productId = req.params.productId;
  const { name, price, desc } = req.body;
  const product = productList.find((item) => item.id === productId);
  if (!product) {
    return res.status(400).json({ errorMessage: `Product don't exist` });
  }

  product.name = name ? name : product.name;
  product.price = price ? price : product.price;
  product.desc = desc ? desc : product.desc;
  res
    .status(200)
    .json({ message: "Product updated successfully", data: productList });
};

// delete product
export const deleteProduct = (req, res) => {
  const productId = req.params.productId;
  const productIndex = productList.findIndex((item) => item.id === productId);
  if (productIndex === -1) {
    return res
      .status(404)
      .json({ message: `Product with id ${productId} don't exist.` });
  }

  productList.splice(productIndex, 1);
  res
    .status(200)
    .json({ message: "Product deleted successfully", data: productList });
};

export const addProductCategory = (req, res) => {};
