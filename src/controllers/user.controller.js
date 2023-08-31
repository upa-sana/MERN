import asyncHandler from "express-async-handler";
import { User } from "../model/user.schema.js";

/**
 * @route : api/users
 * @method  GET
 * @access private
 */

export const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json({ message: "Users list", data: user });
});

/**
 * @route  api/users/:userId
 * @method  GET
 * @access private
 */

export const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = User.findById(userId);
  res.status(200).json({ message: "success", data: user });
});

export const addUser = asyncHandler(async (req, res) => {
  const user = User.create(req.body);
  res.status(201).json({ message: "User list", data: user });
});

export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  // updating the filed: what if the data is too large? it is not possible to destructure and find the every updated field
  user.name = req.body.name;
  user.save();
  res.status(200).json({ message: "User updated successfully", data: user });
});

export const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.deleteOne({ _id: userId });
  res
    .status(200)
    .json({ message: "User deleted successfully", deletedNumber: user });
};
