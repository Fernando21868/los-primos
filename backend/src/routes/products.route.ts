import { Router } from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller";

const router = Router();

console.log(`The route is loading.../categories`);

router.get("/categories/", getCategories);

router.get("/categories/:idCategory", getCategory);

router.post("/categories/", createCategory);

router.put("/categories/:idCategory", updateCategory);

router.delete("/categories/:idCategory", deleteCategory);

export { router };
