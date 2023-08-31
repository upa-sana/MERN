import express from "express";
import * as controller from "../controllers/user.controller.js";

export const router = express.Router();

router.route("/").get(controller.getUsers).post(controller.addUser);
router
  .route("/:userId")
  .post(controller.getUserById)
  .put(controller.updateUser)
  .delete(controller.deleteUser);
