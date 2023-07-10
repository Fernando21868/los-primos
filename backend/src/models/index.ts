import { config } from "../config/db.config";
import mongoose from "mongoose";
import { Db } from "../interfaces/config";
import { Users } from "./users.model";
import { Categories } from "./categories.model";
import { Products } from "./products.model";
mongoose.Promise = global.Promise;

const db: Db = {
  mongoose: mongoose,
  url: config.url,
  users: Users,
  categories: Categories,
  products: Products,
};

export { db };
