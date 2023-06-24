import mongoose, { Model, Schema } from "mongoose";
import { ICategories } from "../interfaces/categories.interface";

const CategoriesSchema: Schema<ICategories> = new Schema<ICategories>(
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

const Categories: Model<ICategories> = mongoose.model<ICategories>(
  "categories",
  CategoriesSchema
);

export { Categories };
