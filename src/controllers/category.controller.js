import * as data from "../model/data.js";

const categoryList = JSON.parse(JSON.stringify(data.category));

export const getCategory = (req, res) => {
  res.status(200).json({ message: "Category List", data: categoryList });
};

//get category by id
export const getCategoryById = (req, res) => {
  const categoryId = req.params.categoryId;
  const category = categoryList.find((item) => item.id === categoryId);
  if (!category) {
    return res
      .status(400)
      .json({ errorMessage: "Bad Request! please provide valid category id" });
  }
  res.status(200).json(category);
};

// post category
export const addCategory = (req, res) => {
  const { categoryName, displayName } = req.body;
  if (!categoryName || !displayName) {
    return res
      .status(400)
      .json({ errorMessage: "Bad Request! please provide category detail" });
  }
  const newCategory = req.body;
  newCategory.id = categoryList.length++;
  categoryList.push(newCategory);
  res.status(200).json({ message: "Category Added!", data: categoryList });
};

// update category
export const updateCategory = (req, res) => {
  const categoryId = req.params.categoryId;
  const { categoryName, displayName } = req.body;
  const category = categoryList.find((item) => item.id === categoryId);

  if (!category) {
    return res
      .status(400)
      .json({ errorMessage: "Bad Request! please provide valid category id" });
  }

  if (!categoryName && !displayName) {
    return res
      .status(400)
      .json({ errorMessage: "Bad Request! please provide category detail" });
  }

  category.categoryName = categoryName ? categoryName : category.categoryName;
  category.displayName = displayName ? displayName : category.displayName;
  res.status(200).json({ message: "Data updated successfully!", categoryList });
};

// delete category
export const deleteCategory = (req, res) => {
  const categoryId = req.params.categoryId;
  const categoryIndex = categoryList.findIndex(
    (item) => item.id === categoryId
  );
  if (categoryIndex === -1) {
    return res
      .status(400)
      .json({ errorMessage: "Bad Request! please provide valid id" });
  }

  categoryList.splice(categoryIndex, 1);
  res.status(200).json({
    message: `Category with id ${categoryId} deleted.`,
    data: categoryList,
  });
};
