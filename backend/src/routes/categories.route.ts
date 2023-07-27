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
import { ensureAuth } from "../middleware/auth";

const router = Router();

console.log(`The route is loading.../categories`);

router.get("/categories/", getCategories);

router.get("/categories/:idCategory", getCategory);

router.post("/categories/", ensureAuth, createCategory);

router.put("/categories/:idCategory", ensureAuth, updateCategory);

router.patch(
  "/categories/:idCategory",
  ensureAuth,
  upload,
  updatePhotoCategory
);

router.delete("/categories/:idCategory", ensureAuth, deleteCategory);

export { router };
