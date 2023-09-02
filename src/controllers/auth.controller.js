import asyncHandler from "express-async-handler";
import { User } from "../model/user.schema.js";

/**
 * @route  POST api/auth/register
 * @access public
 */

export const singup = asyncHandler(async (req, res) => {
  // const user = await services.signupUser(req, res);
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  const token = user.getSignedJwtToken();
  res.status(200).json({ message: "User registerd successfully", token });
});

/**
 * @route  POST api/auth/login
 * @access private
 */
export const login = asyncHandler(async (req, res) => {
  // const token = await services.authenticateUser(req, res);
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ errorMessage: "Invalid Credentials" });
    // return new ErrorResponse("invalid credential", 401); //
  }
  // check if the entered password get matched
  const isMatched = user.matchPassword(password);
  if (!isMatched) {
    return res.status(401).json({ errorMessage: "Invalid Credentials" });
  }

  // const token = user.getSignedJwtToken();
  // res.status(200).json({ message: "You're login successfully!", token });
  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = asyncHandler(async (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() +
        process.env.JWT_COOKIE_TOKEN_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  //   if (process.env.NODE_ENV === "production") {
  //     options.secure = true;
  //   }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ message: `You're login successfully!`, token });
});
