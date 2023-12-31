import mongoose, { Model } from "mongoose";
import { ICategories } from "./categories.interface";
import { IUsers } from "./users.interface";
import { IProducts } from "./products.interface";

export interface Config {
  url: string;
}

export interface Db extends Config {
  mongoose: typeof mongoose;
  categories: Model<ICategories>;
  users: Model<IUsers>;
  products: Model<IProducts>;
}
