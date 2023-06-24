import { NextFunction, Request, Response } from "express";
import { ICategories } from "../interfaces/categories.interface";
import createHttpError from "http-errors";
import {
  createCategoryService,
  deleteCategoryService,
  getCategoriesService,
  getSingleCategoryService,
  updateCategoryService,
} from "../services/categories.service";
import { IUsers } from "../interfaces/users.interface";
import mongoose from "mongoose";
import { categoriesSchema } from "../utils/validationSchema.handler";

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<ICategories[]> | void> => {
  // #swagger.tags = ['categories']
  try {
    const response = await getCategoriesService();
    if (!response) {
      throw createHttpError(404, "Categories does not exists.");
    }
    return res.status(200).json(response);
  } catch (err: any) {
    console.log(err.message);
    next(createHttpError(500, "Error retrieving categories."));
  }
};

const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IUsers> | void> => {
  // #swagger.tags = ['categories']
  try {
    const { idCategory } = req.params;
    const response = await getSingleCategoryService(idCategory);
    if (!response) {
      throw createHttpError(404, "Category does not exists.");
    }
    return res.status(200).json(response);
  } catch (err: any) {
    console.log(err.message);
    if (err instanceof mongoose.Error.CastError) {
      next(createHttpError(400, "Invalid category id."));
      return;
    }
    next(err);
  }
};

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<ICategories> | void> => {
  // #swagger.tags = ['categories']
  try {
    const newCategory: ICategories = {
      nameCategory: req.body.nameCategory,
      description: req.body.description,
      photo: req.body.photo,
    };
    const result: ICategories = await categoriesSchema.validateAsync(newCategory);
    const response: ICategories | null = await createCategoryService(result);
    if (!response) {
      throw createHttpError(404, "Category was not created.");
    }
    return res.status(201).json(response);
  } catch (err: any) {
    console.log(err.message);
    if (err.isJoi === true) err.status = 422;
    if (err.name === "ValidationError")
      return next(createHttpError(422, err.message));
    next(err);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<ICategories> | void> => {
  // #swagger.tags = ['categories']
  try {
    const { idCategory } = req.params;
    const newCategory: ICategories = {
      nameCategory: req.body.nameCategory,
      description: req.body.description,
      photo: req.body.photo,
    };
    const result: ICategories = await categoriesSchema.validateAsync(newCategory);
    const response: ICategories | null = await updateCategoryService(
      idCategory,
      result
    );
    if (!response) {
      throw createHttpError(404, "Category was not updated.");
    }
    return res.status(200).json(response);
  } catch (err: any) {
    console.log(err.message);
    if (err.isJoi === true) err.status = 422;
    if (err.name === "ValidationError")
      return next(createHttpError(422, err.message));
    if (err instanceof mongoose.Error.CastError)
      return next(createHttpError(400, "Invalid category id."));
    next(err);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<ICategories> | void> => {
  // #swagger.tags = ['categories']
  try {
    const { idCategory } = req.params;
    const response = await deleteCategoryService(idCategory);
    if (!response) {
      throw createHttpError(404, "Category was not deleted.");
    }
    return res.status(200).json(response);
  } catch (err: any) {
    console.log(err.message);
    if (err instanceof mongoose.Error.CastError) {
      next(createHttpError(400, "Invalid category id."));
      return;
    }
    next(err);
  }
};

export { getCategories, getCategory, createCategory, updateCategory, deleteCategory };
