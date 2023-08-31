import express from "express";
import { router as categoryRouter } from "./routes/category.route.js";
import { router as productRouter } from "./routes/product.route.js";
import { router as userRouter } from "./routes/user.route.js";
export const app = express();

app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/users", userRouter);
// mainRoute.use("/user");
