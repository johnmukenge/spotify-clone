import { Router } from "express";
import { getAdmin } from "../controller/admin.controller.js";

const router = Router();

router.get("/", getAdmin);

router.post("/users", (req, res) => {
  // Logic to create a new user
});

export default router;
