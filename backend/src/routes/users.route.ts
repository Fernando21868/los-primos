import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateProfilePhotoUser,
  updateUser,
} from "../controllers/users.controller";
import { upload } from "../middleware/file.middleware";
import { ensureAuth } from "../middleware/auth";

const router = Router();

console.log(`The route is loading.../users`);

router.get("/users/", getUsers);

router.get("/users/:idUser", getUser);

router.post("/users/", ensureAuth, createUser);

router.patch("/users/:idUser", ensureAuth, upload, updateProfilePhotoUser);

router.put("/users/:idUser", ensureAuth, updateUser);

router.delete("/users/:idUser", ensureAuth, deleteUser);

export { router };
