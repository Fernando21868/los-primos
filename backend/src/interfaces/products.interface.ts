import { ObjectId } from "mongoose";

export interface IProducts {
  name: string;
  description: string;
  category: ObjectId;
  photo: string;
  price: number;
  stock: number;
  brand: string;
  expirationDate: string;
  barcode?: string;
  weight?: string;
  size?: string;
}

export type TProductsPhoto = Pick<IProducts, "photo">;
