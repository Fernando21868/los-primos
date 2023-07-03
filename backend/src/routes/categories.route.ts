import { NextFunction, Request, Response, Router } from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  updatePhotoCategory,
} from "../controllers/categories.controller";
import { uploadFile, upload } from "../middleware/file.middleware";
import multer from "multer";

const router = Router();

console.log(`The route is loading.../categories`);

router.get("/categories/", getCategories);

router.get("/categories/:idCategory", getCategory);

router.post("/categories/", createCategory);

router.put("/categories/:idCategory", updateCategory);

router.patch("/categories/:idCategory", upload, updatePhotoCategory);

router.delete("/categories/:idCategory", deleteCategory);

export { router };
