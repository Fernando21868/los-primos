import { NextFunction, Request, Response, Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  updatePhotoProduct,
  getCategoryOfProduct,
  getProductsByCategory,
} from "../controllers/products.controller";
import { uploadFile, upload } from "../middleware/file.middleware";
import multer from "multer";
import { ensureAuth } from "../middleware/auth";

const router = Router();

console.log(`The route is loading.../products`);

router.get("/products/", getProducts);

router.get("/products/:idProduct", getProduct);

router.get("/products/category/:idProduct", getCategoryOfProduct);

router.get("/products/productsByCategory/:idCategory", getProductsByCategory);

router.post("/products/", ensureAuth, createProduct);

router.put("/products/:idProduct", ensureAuth, updateProduct);

router.patch("/products/:idProduct", ensureAuth, upload, updatePhotoProduct);

router.delete("/products/:idProduct", ensureAuth, deleteProduct);

export { router };
