import { IProducts } from "../interfaces/products.interface";
import { db } from "../models";

const getProductsService = async (): Promise<IProducts[] | null> => {
  const response = await db.products.find({});
  return response;
};

const getSingleProductService = async (
  idProduct: string
): Promise<IProducts | null> => {
  const response = await db.products.findById({ _id: idProduct });
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
    product
  );
  return response;
};

const deleteProductService = async (
  idProduct: string
): Promise<IProducts | null> => {
  const response = await db.products.findOneAndDelete({ _id: idProduct });
  return response;
};

export {
  getProductsService,
  getSingleProductService,
  createProductService,
  updateProductService,
  deleteProductService,
};
