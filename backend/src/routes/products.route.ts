import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deletProduct,
} from "../controllers/products.controller";

const router = Router();

console.log(`The route is loading.../products`);

router.get("/products/", getProducts);

router.get("/products/:idProduct", getProduct);

router.post("/products/", createProduct);

router.put("/products/:idProduct", updateProduct);

router.delete("/products/:idProduct", deletProduct);

export { router };
