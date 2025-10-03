import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getStats } from "../controller/stat.controller.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getStats);

router.post("/stats", (req, res) => {
  // Logic to create a new stat
});

export default router;
