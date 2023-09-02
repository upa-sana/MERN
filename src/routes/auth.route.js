import express from "express";
import * as controller from "../controllers/auth.controller.js";

export const router = express.Router();
// router.use(protactedRoute);
router.post("/signup", controller.singup);
router.post("/login", controller.login);
