import asyncHandler from "express-async-handler";
import * as services from "../services/product.service.js";

/**
 * @route   GET api/products *
 * @access  public
 */
export const getProduct = asyncHandler(async (req, res) => {
  // const product = await services.findProducts(req);
  res.status(200).json(res.advanceData);
});

/**
 * @route   GET api/products/:productId *
 * @access  public
 */
export const getProductbyId = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const product = await services.findProductById(productId);
  res.status(200).json({ message: "Product", data: product });
});

/**
 * @route   POST api/products
 * @access  private
 */
export const addProduct = asyncHandler(async (req, res) => {
  const requestBody = req.body;
  requestBody.image = req.file;
  const product = await services.createProduct(requestBody);
  res
    .status(201)
    .json({ message: "Product added successfully", data: product });
});

/**
 * @route   PUT api/products/:productId
 * @access  private
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const requestBody = req.body;
  console.log("request body", req);
  const product = await services.putProduct(productId, requestBody);
  res
    .status(200)
    .json({ message: "Product updated successfully", data: product });
});

/**
 * @route    DELETE api/products/:productId
 * @access   private
 */
export const removeProduct = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const product = await services.deleteProduct(productId);
  res
    .status(200)
    .json({ message: "Product deleted successfully", data: product });
});

/**
 * @route    POST api/products/:productId/add-category
 * @access   private
 */
export const addProductCategory = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const categoryName = req.body.categoryName;
  const product = await services.createProductCategory(productId, categoryName);
  res
    .status(200)
    .json({ message: "Category name is added to the product", data: product });
});

/**
 * @route    POST api/products/category/:categoryName
 * @access   private
 */
export const getProductByCategory = asyncHandler(async (req, res) => {
  const categoryName = req.params.categoryName;
  const product = await services.findProductByCategory(categoryName, req);
  res.status(200).json({
    message: `Product list with category '${categoryName}'`,
    product,
  });
});
