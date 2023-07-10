import mongoose, { Model, Schema } from "mongoose";
import { IProducts } from "../interfaces/products.interface";

const ProductsSchema: Schema<IProducts> = new Schema<IProducts>(
  {
    name: { type: String },
    description: { type: String },
    category: { type: mongoose.Types.ObjectId, ref: "categories" },
    photo: { type: String },
    price: { type: Number },
    stock: { type: Number },
    brand: { type: String },
    expirationDate: { type: String },
    barcode: { type: String },
    weight: { type: String },
    size: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const Products: Model<IProducts> = mongoose.model<IProducts>(
  "products",
  ProductsSchema
);

export { Products };
