import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { app as mainApp } from "./app.js";
import { errorHandler } from "./middleware/error.handler.js";
import { MONGO_DB_CONNECTION_URL, PORT } from "./utils/env.parser.js";

mongoose.connect(MONGO_DB_CONNECTION_URL).then(
  () => {
    console.log("Server connection established!");
  },
  (error) => {
    console.log(`An error occured while connecting server`);
  }
);
const app = express();
const port = PORT;

// Cors implementation
app.use(cors());

// request body parser middlerware
app.use(express.json());

//main route entry point

app.use("/api", mainApp);
app.use(errorHandler);
// app listing point
app.listen(port, () => {
  console.log(`Server is running in the port: ${port}`);
});
