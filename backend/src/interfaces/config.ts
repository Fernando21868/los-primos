import mongoose, { Model } from "mongoose";
import { IProducts } from "./products.interface";
import { IUsers } from "./users.interface";

export interface Config {
  url: string;
}

export interface Db extends Config {
  mongoose: typeof mongoose;
  products: Model<IProducts>;
  users: Model<IUsers>;
}