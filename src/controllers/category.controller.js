import * as services from "../services/category.service.js";

// const categoryList = JSON.parse(JSON.stringify(data.category));

export const getCategory = async (req, res) => {
  const category = await services.findCategory();
  res.status(200).json({ category: "Category List", data: category });
};

//get category by id
export const getCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;
  // const category = categoryList.find((item) => item.id === categoryId);
  const category = await services.findCategoryById(categoryId);
  res
    .status(200)
    .json({ message: `category with ${categoryId}`, data: category });
};

// post category
export const addCategory = async (req, res) => {
  // const { categoryName, displayName } = req.body;
  // if (!categoryName || !displayName) {
  //   return res
  //     .status(400)
  //     .json({ errorMessage: "Bad Request! please provide category detail" });
  // }
  const newCategory = req.body;
  const category = await services.createCategory(newCategory);

  res
    .status(201)
    .json({ message: "category created successfully!", data: category });

  // newCategory.id = categoryList.length++;
  // categoryList.push(newCategory);
  // res.status(200).json({ message: "Category Added!", data: categoryList });
};

// update category
export const updateCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  // const { categoryName, displayName } = req.body;
  // if (!categoryName && !displayName) {
  //   return res
  //     .status(400)
  //     .json({ errorMessage: "Bad Request! please provide category detail" });
  // }

  // const category = categoryList.find((item) => item.id === categoryId);

  const category = await services.putCategory(categoryId, req.body);

  // category.categoryName = categoryName ? categoryName : category.categoryName;
  // category.displayName = displayName ? displayName : category.displayName;

  res.status(200).json({ message: "Data updated successfully!", category });
};

// delete category
export const removeCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  const category = await services.deleteCategory(categoryId);
  res.status(200).json({ message: "Data deleted successfully!", category });
};

/*
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
*/
