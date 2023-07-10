import { NextFunction, Request, Response } from "express";
import { IProducts, TProductsPhoto } from "../interfaces/products.interface";
import createHttpError from "http-errors";
import {
  createProductService,
  deleteProductService,
  getCategoryOfProductService,
  getProductsByCategoryService,
  getProductsService,
  getSingleProductService,
  updateProductService,
  updateProductServicePhoto,
} from "../services/products.service";
import { IUsers } from "../interfaces/users.interface";
import mongoose from "mongoose";
import {
  productsSchema,
  productsSchemaPhoto,
} from "../utils/validationSchema.handler";
import multer from "multer";
import { uploadFile } from "../middleware/file.middleware";

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

const getCategoryOfProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IUsers> | void> => {
  // #swagger.tags = ['products']
  try {
    const { idProduct } = req.params;
    const response = await getCategoryOfProductService(idProduct);
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

const getProductsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IProducts[]> | void> => {
  // #swagger.tags = ['products']
  try {
    const response = await getProductsByCategoryService(req.params.idCategory);
    if (!response) {
      throw createHttpError(404, "Products does not exists.");
    }
    return res.status(200).json(response);
  } catch (err: any) {
    console.log(err.message);
    next(createHttpError(500, "Error retrieving products."));
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
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      photo: req.body.photo,
      price: req.body.price,
      stock: req.body.stock,
      brand: req.body.brand,
      expirationDate: req.body.expirationDate,
      barcode: req.body.barcode,
      weight: req.body.weight,
      size: req.body.size,
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
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      photo: req.body.photo,
      price: req.body.price,
      stock: req.body.stock,
      brand: req.body.brand,
      expirationDate: req.body.expirationDate,
      barcode: req.body.barcode,
      weight: req.body.weight,
      size: req.body.size,
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

const deleteProduct = async (
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

const updatePhotoProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IProducts> | void> => {
  // #swagger.tags = ['products']
  try {
    const { idProduct } = req.params;
    let webLink = await uploadFile(req.file);
    const fileId = webLink?.match(/\/d\/([^\/]+)\//)?.[1];
    const directUrl = `https://drive.google.com/uc?id=${fileId}`;
    const file: TProductsPhoto = { photo: directUrl };
    const result: TProductsPhoto = await productsSchemaPhoto.validateAsync(
      file
    );
    const response: IProducts | null = await updateProductServicePhoto(
      idProduct,
      result
    );
    if (!response) {
      throw createHttpError(404, "Photo of product was not updated.");
    }
    return res.status(200).json(response);
  } catch (err: any) {
    console.log(err.message);
    if (err.isJoi === true) err.status = 422;
    if (err.name === "ValidationError")
      return next(createHttpError(422, err.message));
    if (err instanceof mongoose.Error.CastError)
      return next(createHttpError(400, "Invalid product id."));
    if (err instanceof multer.MulterError)
      next(createHttpError(400, "Invalid multer error."));
    next(err);
  }
};

export {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  updatePhotoProduct,
  getCategoryOfProduct,
  getProductsByCategory,
};
