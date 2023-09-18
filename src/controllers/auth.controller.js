import asyncHandler from "express-async-handler";
import { User } from "../model/user.schema.js";
import { ErrorResponse } from "../utils/error.response.js";

/**
 * @route  POST api/auth/register
 * @access public
 */
export const singup = asyncHandler(async (req, res) => {
  // const user = await services.signupUser(req, res);
  console.log("user detail info at register time", req.body);
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  const token = user.getSignedJwtToken();
  res.status(200).json({ message: "User registerd successfully", token });
});

/**
 * @route  POST api/auth/login
 * @access private
 */
export const login = asyncHandler(async (req, res, next) => {
  // const token = await services.authenticateUser(req, res);
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    // return res.status(401).json({ errorMessage: "Invalid Credentials" });
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  // check if the entered password get matched
  const isMatched = await user.matchPassword(password);
  if (!isMatched) {
    // return res.status(401).json({ errorMessage: "Invalid Credentials" });
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  // const token = user.getSignedJwtToken();
  // res.status(200).json({ message: "You're login successfully!", token });
  console.log("user detail info after pss match", user);
  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = asyncHandler(async (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const userInfo = JSON.parse(atob(token.split(".")[1]));

  // const user

  /*
  const options = {
    expires: new Date(
      Date.now() + JWT_COOKIE_TOKEN_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  */

  //   if (process.env.NODE_ENV === "production") {
  //     options.secure = true; // QN - on http connection cookies are not in encripted form Therefore, we need to set the Secure flag to ensure that the cookie is encrypted when it’s created.
  //   }
  res
    .status(statusCode)
    .json({ message: `You're login successfully!`, token, userInfo });
});
