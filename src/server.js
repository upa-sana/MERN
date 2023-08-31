import express from "express";
import mongoose from "mongoose";
import { app as mainApp } from "./app.js";
import { errorHandler } from "./middleware/error.handler.js";
//mongoose.connect('mongodb://127.0.0.1:27017/myapp');
const MONGO_URL = "mongodb://127.0.0.1:27017/ecommerce";
mongoose.connect(MONGO_URL).then(
  () => {
    console.log("Server connection established!");
  },
  (error) => {
    console.log(`An error occured while connecting server`);
  }
);
const app = express();
const PORT = 3000;

// request body parser middlerware
app.use(express.json());

//main route entry point

app.use("/api", mainApp);
app.use(errorHandler);
// app listing point
app.listen(PORT, () => {
  console.log(`Server is running in the port: ${PORT}`);
});
