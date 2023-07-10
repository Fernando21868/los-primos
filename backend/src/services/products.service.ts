import { IProducts, TProductsPhoto } from "../interfaces/products.interface";
import { db } from "../models";

const getProductsService = async (): Promise<IProducts[] | null> => {
  const response = await db.products.find({});
  return response;
};

const getProductsByCategoryService = async (
  idCategory: string
): Promise<IProducts[] | null> => {
  const response = await db.products.find({ category: idCategory });
  return response;
};

const getSingleProductService = async (
  idProduct: string
): Promise<IProducts | null> => {
  const response = await db.products.findById({ _id: idProduct });
  return response;
};

const getCategoryOfProductService = async (
  idProduct: string
): Promise<IProducts | null> => {
  const response = await db.products
    .findById({ _id: idProduct })
    .populate("category");
  return response;
};

const createProductService = async (
  product: IProducts
): Promise<IProducts | null> => {
  const response = await db.products.create(product);
  return response;
};

const updateProductService = async (
  idProduct: string,
  product: IProducts
): Promise<IProducts | null> => {
  const response = await db.products.findOneAndUpdate(
    { _id: idProduct },
    product,
    { new: true }
  );
  return response;
};

const deleteProductService = async (
  idProduct: string
): Promise<IProducts | null> => {
  const response = await db.products.findOneAndDelete({ _id: idProduct });
  return response;
};

const updateProductServicePhoto = async (
  idProduct: string,
  photo: TProductsPhoto
): Promise<IProducts | null> => {
  const response = await db.products.findOneAndUpdate(
    { _id: idProduct },
    photo,
    { new: true }
  );
  return response;
};

export {
  getProductsService,
  getSingleProductService,
  createProductService,
  updateProductService,
  deleteProductService,
  updateProductServicePhoto,
  getCategoryOfProductService,
  getProductsByCategoryService,
};
