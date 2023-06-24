import mongoose, { Model, Schema } from "mongoose";
import { IProducts } from "../interfaces/products.interface";

const ProductsSchema: Schema<IProducts> = new Schema<IProducts>(
  {
    description: {
      type: String,
    },
    nameCategory: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const Products: Model<IProducts> = mongoose.model<IProducts>(
  "products",
  ProductsSchema
);

export { Products };
