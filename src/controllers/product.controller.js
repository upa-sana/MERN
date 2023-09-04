import asyncHandler from "express-async-handler";
import * as services from "../services/product.service.js";

/**
 * @route   GET api/products *
 * @access  public
 */
export const getProduct = asyncHandler(async (req, res) => {
  // const product = await Product.find()
  //   .populate("category", {
  //     path: "category",
  //     select: "categoryName displayName",
  //   })
  //   .where("price")
  //   .gte(50000)
  //   .lte(60000);
  const product = await services.findProducts(req);
  res.status(200).json({ message: "product list", data: product });
});

/**
 * @route   GET api/products/:productId *
 * @access  public
 */
export const getProductbyId = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const product = await services.findProductById(productId);
  // if (!product) {
  // return res
  //   .status(404)
  //   .json({ message: `Product with id ${productId} doesn't exist.` });
  // next(new ErrorResponse(`Product with id ${productId} doesn't exist.`, 404));
  // } // I don't need to handle this error. since this is being handle by the mongoose and asyncHandler library.
  res.status(200).json({ message: "Product", data: product });
});

/**
 * @route   POST api/products
 * @access  private
 */
export const addProduct = asyncHandler(async (req, res) => {
  /**
   * error handling :
   * if the function us synchronous then using the throw new Error(message) will theow the error in the api calling interface eg. browser or postman.
   * if the function is asynchronous then next() is used to throw the error eg. next(new Error(message)) or any other custom handiling class eg. next(new ErrorResponse(message));
   * if the function is asychronous and error is throwing while doing the mongoose CRUD operaton then they can be handle by the asyncHandler library: in the error occurance it automatically throw an error on the browser but we can intercept it using an middleware. the process will (app.use(errorHandler) this is used on server.js file down the api route, errorHandler middleware will called after the error occurance in the specific route after that middleware will run and modify the error content and send the response to the browser);
   */

  // if (!name || !price || !desc) {
  //   res.status(400).json({ error: "Bad Request!, invalid properties" });
  // }

  // const product = await Product.create(req.body);
  const product = await services.createProduct(req.body);
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
  // const product = await Product.findByIdAndUpdate(productId, req.body, {
  //   new: true,
  //   runValidators: true,
  // }); // it don't do the full-fleged validation

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
  // const product = await Product.findByIdAndRemove(productId); or,
  const productId = req.params.productId;
  const product = await services.deleteProduct(productId);
  // const product = await Product.deleteOne({ _id: req.params.productId });
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
  console.log(categoryName);
  const product = await services.findProductByCategory(categoryName);
  console.log(product);
  res.status(200).json({
    message: `Product list with category '${categoryName}'`,
    data: product,
  });
});
