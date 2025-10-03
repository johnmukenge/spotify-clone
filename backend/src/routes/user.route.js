import { Router } from "express";
import {
  getAllUsers,
} from "../controller/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, getAllUsers);
// TODO: Get messages between two users
//router.get("/:id", protestRoute, getUserById);
//router.post("/", protestRoute, createUser);
//router.put("/:id", protestRoute, updateUser);
//router.delete("/:id", protestRoute, deleteUser);

export default router;
