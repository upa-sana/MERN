export const checkBodyRequest = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Bad Request!" });
  }

  next();
};
