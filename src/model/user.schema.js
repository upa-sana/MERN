import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user name is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    unique: true,
    select: false,
  },
  email: {
    type: String,
    required: [true, "meail is required"],
    lowercase: true,
    match: new RegExp("[a-zA-z0-9.]+@[a-z].[a-z]{2,3}"),
    unique: true,
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

//Encrpting password
userSchema.pre("save", async function (next) {
  console.log("pre middleware get called", this.password);
  // Note: here i have the access to the all the request body.
  // Generating salt: 10 is tha standard and recommended number
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// JWT token
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      userId: this._id,
      email: this.email,
    },
    process.env.SECRET_KEY,
    { expiresIn: "30d" }
  );
};

//Matching user entered password to hashed passowrd in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // return true or false
};

export const User = mongoose.model("User", userSchema);
