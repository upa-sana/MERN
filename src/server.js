import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { app as mainApp } from "./app.js";
import { errorHandler } from "./middleware/error.handler.js";

dotenv.config();
//mongoose.connect('mongodb://127.0.0.1:27017/myapp');
// const MONGO_URL = "mongodb://127.0.0.1:27017/ecommerce";

mongoose.connect(process.env.MONGO_DB_CONNECTION_URL).then(
  () => {
    console.log("Server connection established!");
  },
  (error) => {
    console.log(`An error occured while connecting server`);
  }
);
const app = express();
const PORT = process.env.PORT;

// request body parser middlerware
app.use(express.json());

//main route entry point

app.use("/api", mainApp);
app.use(errorHandler);
// app listing point
app.listen(PORT, () => {
  console.log(`Server is running in the port: ${PORT}`);
});
