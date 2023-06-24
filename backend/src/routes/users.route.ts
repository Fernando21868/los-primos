import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users.controller";

const router = Router();

console.log(`The route is loading.../users`);

router.get("/users/", getUsers);

router.get("/users/:idUser", getUser);

router.post("/users/", createUser);

router.put("/users/:idUser", updateUser);

router.delete("/users/:idUser", deleteUser);

export { router };
