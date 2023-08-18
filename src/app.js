import express from "express";
import { router as categoryRouter } from "./routes/category.route.js";
import { router as productRoter } from "./routes/product.route.js";
export const app = express();

app.use("/products", productRoter);
app.use("/category", categoryRouter);
// mainRoute.use("/user");
