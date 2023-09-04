import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL;
export const JWT_TOKEN_EXPIRE_TIME = process.env.JWT_TOKEN_EXPIRE_TIME;
export const JWT_COOKIE_TOKEN_EXPIRE_TIME =
  process.env.JWT_COOKIE_TOKEN_EXPIRE_TIME;
