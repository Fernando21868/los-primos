import { ICategories } from "../interfaces/categories.interface";
import { db } from "../models";

const getCategoriesService = async (): Promise<ICategories[] | null> => {
  const response = await db.categories.find({});
  return response;
};

const getSingleCategoryService = async (
  idCategory: string
): Promise<ICategories | null> => {
  const response = await db.categories.findById({ _id: idCategory });
  return response;
};

const createCategoryService = async (
  product: ICategories
): Promise<ICategories | null> => {
  const response = await db.categories.create(product);
  return response;
};

const updateCategoryService = async (
  idCategory: string,
  product: ICategories
): Promise<ICategories | null> => {
  const response = await db.categories.findOneAndUpdate(
    { _id: idCategory },
    product
  );
  return response;
};

const deleteCategoryService = async (
  idCategory: string
): Promise<ICategories | null> => {
  const response = await db.categories.findOneAndDelete({ _id: idCategory });
  return response;
};

export {
  getCategoriesService,
  getSingleCategoryService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
};
