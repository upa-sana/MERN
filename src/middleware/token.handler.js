import jwt from "jsonwebtoken";
import { User } from "../model/user.schema.js";
import { JWT_SECRET_KEY } from "../utils/env.parser.js";
import { ErrorResponse } from "../utils/error.response.js";
export const protactedRoute = async (req, res, next) => {
  let token;
  const headers = req.headers.authorization || req.headers.authorizations;

  if (headers && headers.startsWith("Bearer")) {
    token = headers.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse(`Token is miissing!`, 400));
  }

  // jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
  //   if (error) {
  //     res.status(400).json({ message: "User not authorized to access" });
  //   }
  //   console.log("decoded", decoded);
  //   req.user = decoded.user;
  //   next();
  // });

  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY); // return the payload seted on the jwt payload section while jwt signing.
    req.user = await User.findById(payload.id); // Note:- it is returning null here: concern it please
    next();
  } catch (error) {
    // res
    //   .status(401)
    //   .json({ errorMessage: `You're not authorized to access this route` });

    return next(
      new ErrorResponse(`You're not authorized to access this route`, 401)
    );
  }
};
