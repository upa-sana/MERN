import jwt from "jsonwebtoken";
import { User } from "../model/user.schema.js";
export const protactedRoute = async (req, res, next) => {
  let token;
  const headers = req.headers.authorization || req.headers.authorizations;

  if (headers && headers.startsWith("Bearer")) {
    token = headers.split(" ")[1];
  }

  if (!token) {
    res.status(400).json({ message: "Token is miissing!" });
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
    const decoded = jwt.verify("token", token);
    console.log("decoded", decoded);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res
      .status(401)
      .json({ errorMessage: `You're not authorized to access this route` });
  }
};
