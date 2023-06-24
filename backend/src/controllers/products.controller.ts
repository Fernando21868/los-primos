import { NextFunction, Request, Response } from "express";
import { IProducts } from "../interfaces/products.interface";
import createHttpError from "http-errors";
import {
  createProductService,
  deleteProductService,
  getProductsService,
  getSingleProductService,
  updateProductService,
} from "../services/products.service";
import { IUsers } from "../interfaces/users.interface";
import mongoose from "mongoose";
import { productsSchema } from "../utils/validationSchema.handler";

const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IProducts[]> | void> => {
  // #swagger.tags = ['products']
  try {
    const response = await getProductsService();
    if (!response) {
      throw createHttpError(404, "Products does not exists.");
    }
    return res.status(200).json(response);
  } catch (err: any) {
    console.log(err.message);
    next(createHttpError(500, "Error retrieving products."));
  }
};

const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IUsers> | void> => {
  // #swagger.tags = ['products']
  try {
    const { idProduct } = req.params;
    const response = await getSingleProductService(idProduct);
    if (!response) {
      throw createHttpError(404, "Product does not exists.");
    }
    return res.status(200).json(response);
  } catch (err: any) {
    console.log(err.message);
    if (err instanceof mongoose.Error.CastError) {
      next(createHttpError(400, "Invalid product id."));
      return;
    }
    next(err);
  }
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IProducts> | void> => {
  // #swagger.tags = ['products']
  try {
    const newProduct: IProducts = {
      nameCategory: req.body.nameCategory,
      description: req.body.description,
      photo: req.body.photo,
    };
    const result: IProducts = await productsSchema.validateAsync(newProduct);
    const response: IProducts | null = await createProductService(result);
    if (!response) {
      throw createHttpError(404, "Product was not created.");
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

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IProducts> | void> => {
  // #swagger.tags = ['products']
  try {
    const { idProduct } = req.params;
    const newProduct: IProducts = {
      nameCategory: req.body.nameCategory,
      description: req.body.description,
      photo: req.body.photo,
    };
    const result: IProducts = await productsSchema.validateAsync(newProduct);
    const response: IProducts | null = await updateProductService(
      idProduct,
      result
    );
    if (!response) {
      throw createHttpError(404, "Product was not updated.");
    }
    return res.status(200).json(response);
  } catch (err: any) {
    console.log(err.message);
    if (err.isJoi === true) err.status = 422;
    if (err.name === "ValidationError")
      return next(createHttpError(422, err.message));
    if (err instanceof mongoose.Error.CastError)
      return next(createHttpError(400, "Invalid product id."));
    next(err);
  }
};

const deletProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IProducts> | void> => {
  // #swagger.tags = ['products']
  try {
    const { idProduct } = req.params;
    const response = await deleteProductService(idProduct);
    if (!response) {
      throw createHttpError(404, "Product was not deleted.");
    }
    return res.status(200).json(response);
  } catch (err: any) {
    console.log(err.message);
    if (err instanceof mongoose.Error.CastError) {
      next(createHttpError(400, "Invalid product id."));
      return;
    }
    next(err);
  }
};

export { getProducts, getProduct, createProduct, updateProduct, deletProduct };
