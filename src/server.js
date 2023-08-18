import express from "express";
import { app as mainApp } from "./app.js";
const app = express();
const PORT = 8080;

// request body parser middlerware
app.use(express.json());

//main route entry point
app.use("/api", mainApp);

// app listing point
app.listen(PORT, () => {
  console.log(`Server is running in the port: ${PORT}`);
});
