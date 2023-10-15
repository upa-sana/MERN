import removeEmptyProperties from "../utils/remove-empty-properties.js";

const pagination = (Modal, Populate) => async (req, res, next) => {
  removeEmptyProperties(req.query);
  let query;
  // storing request query
  const reqQuery = { ...req.query };

  // creating remove field and removing filter and sort from the reqest query
  const removeField = ["select", "sort", "page", "size"];
  removeField.forEach((param) => delete reqQuery[param]);

  // sort
  const sortBy = req.query.sort
    ? req.query.sort.split(",").join(" ")
    : "-price";

  // pagination
  const page = parseInt(req.query.page) || 0;
  const size = parseInt(req.query.size) || 10;

  const startIndex = page * size;
  const endIndex = size;

  //filtering, sorting, paginating
  query = await Modal.find(reqQuery)
    .sort(sortBy)
    .skip(startIndex)
    .limit(endIndex)
    .exec();

  const totalData = await Modal.countDocuments();

  res.advanceData = {
    data: query,
    totalData: totalData ?? totalData,
  };
  next();
};

export default pagination;
