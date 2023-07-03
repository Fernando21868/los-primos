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

const router = Router();

console.log(`The route is loading.../users`);

router.get("/users/", getUsers);

router.get("/users/:idUser", getUser);

router.post("/users/", createUser);

router.patch("/users/:idUser", upload, updateProfilePhotoUser);

router.put("/users/:idUser", updateUser);

router.delete("/users/:idUser", deleteUser);

export { router };
