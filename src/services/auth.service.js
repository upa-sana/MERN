// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { User } from "../model/user.schema.js";

/*
export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({ message: "user already exist" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  return await User.create({
    name,
    email,
    password: encryptedPassword,
  });
};
*/

// export const authenticateUser = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user && bcrypt.compare(password, user.password)) {
//     const token = jwt.sign(
//       {
//         id: user._id,
//         email: user.email,
//       },
//       process.env.SECRET_KEY,
//       { expiresIn: "60m" }
//     );
//
//     return token;
//   } else {
//     return res.status(400).json({ message: "Invalid email or password!" });
//   }
// };
