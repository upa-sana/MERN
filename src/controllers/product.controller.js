import asyncHandler from "express-async-handler";
import * as data from "../model/data.js";
import * as services from "../services/product.service.js";

const productList = JSON.parse(JSON.stringify(data.products));
const categoryList = JSON.parse(JSON.stringify(data.category));

/**
 * @route  api/products
 * @method  GET
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
 * @route api/products/:productId
 * @method  GET
 * @access public
 */
export const getProductbyId = asyncHandler(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await services.findProductById();
  // if (!product) {
  // return res
  //   .status(404)
  //   .json({ message: `Product with id ${productId} doesn't exist.` });
  // next(new ErrorResponse(`Product with id ${productId} doesn't exist.`, 404));
  // } // I don't need to handle this error. since this is being handle by the mongoose and asyncHandler library.
  res.status(200).json({ message: "Product", data: product });
});

/**
 * @route api/products
 * @method: POST
 * @access: public
 */
export const addProduct = asyncHandler(async (req, res, next) => {
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
 * @route api/products/:productId
 * @method: PUT
 * @access: public
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.productId;

  // const product = await Product.findByIdAndUpdate(productId, req.body, {
  //   new: true,
  //   runValidators: true,
  // }); // it don't do the full-fleged validation

  const product = await services.putProduct(productId, req.body);
  res
    .status(200)
    .json({ message: "Product updated successfully", data: product });
});

/**
 * @route api/products/:productId
 * @method: DELETE
 * @access: public
 */
export const removeProduct = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  // const product = await Product.findByIdAndRemove(productId); or,
  const product = await services.deleteProduct(productId);
  res
    .status(200)
    .json({ message: "Product deleted successfully", data: product });
});

// aggreation
export const addProductCategory = (req, res) => {
  const productId = req.params.productId;
  const categoryName = req.body.categoryName;
  const productIndex = productList.findIndex((item) => item.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({ message: `Product don't exist.` });
  }

  const categoryIndex = categoryList.findIndex(
    (item) => item.categoryName === categoryName
  );

  if (categoryIndex === -1) {
    return res.status(400).json({ errorMessage: "Category name don't exist" });
  }

  productList[productIndex] = {
    ...productList[productIndex],
    categoryName,
  };
  res.status(200).json({ message: "Category name is added to the product" });
};

// get product as per the category
export const getProductByCategory = (req, res) => {
  console.log("do the category is called");
  const categoryName = req.params.categoryName;
  const productIndex = productList.findIndex(
    (item) => item.categoryName === categoryName
  );
  if (productIndex === -1) {
    return res
      .status(404)
      .json({ message: `Product with the provided category don't exist.` });
  }

  const productAsPerCategory = productList.filter(
    (item) => item.categoryName === categoryName
  );
  res.status(200).json({
    message: `Product list with category '${categoryName}'`,
    data: productAsPerCategory,
  });
};
