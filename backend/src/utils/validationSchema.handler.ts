import Joi from "joi";
const objectId = require("joi-objectid");
import { IUsers, TUserProfilePhoto } from "../interfaces/users.interface";
import {
  ICategories,
  TCategoriesPhoto,
} from "../interfaces/categories.interface";
import { IProducts, TProductsPhoto } from "../interfaces/products.interface";

const userSchema = Joi.object<IUsers>({
  firstName: Joi.string().required().min(4).max(128),
  lastName: Joi.string().required().min(4).max(128),
  dni: Joi.string().required().min(7).max(9),
  email: Joi.string()
    .required()
    .pattern(new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)),
  password: Joi.string()
    .required()
    .min(8)
    .max(128)
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)),
  repeatPassword: Joi.ref("password"),
  permissions: Joi.string().valid(
    "administrador",
    "gerente",
    "empleado",
    "cliente"
  ),
  phoneNumber: Joi.string().required().min(9).max(128),
  googleId: Joi.string().min(21),
  sex: Joi.string().valid("masculino", "femenino", "sin especificar"),
  profilePhoto: Joi.string(),
});

const categoriesSchema = Joi.object<ICategories>({
  description: Joi.string().required().max(500),
  nameCategory: Joi.string()
    .required()
    .default("conveniencia")
    .valid(
      "conveniencia",
      "golosinas",
      "bebidas",
      "limpieza",
      "refrigerados",
      "no perecederos"
    ),
  photo: Joi.string(),
});

const productsSchema = Joi.object<IProducts>({
  name: Joi.string().required().max(100),
  description: Joi.string().required().max(500),
  category: Joi.string().required(),
  photo: Joi.string(),
  price: Joi.number().required().greater(4).less(5001),
  stock: Joi.number().required().less(5001),
  brand: Joi.string().required().min(2).max(100),
  expirationDate: Joi.string().required(),
  barcode: Joi.string().min(2).max(100),
  weight: Joi.string().min(1).max(100_000),
  size: Joi.string(),
});

const categoriesSchemaPhoto = Joi.object<TCategoriesPhoto>({
  photo: Joi.string().required(),
});

const userSchemaProfilePhoto = Joi.object<TUserProfilePhoto>({
  profilePhoto: Joi.string().required(),
});

const productsSchemaPhoto = Joi.object<TProductsPhoto>({
  photo: Joi.string().required(),
});

export {
  userSchema,
  categoriesSchema,
  categoriesSchemaPhoto,
  userSchemaProfilePhoto,
  productsSchema,
  productsSchemaPhoto
};
