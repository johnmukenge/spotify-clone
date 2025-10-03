import { Router } from "express";
import { createSong, deleteSong, createAlbum, deleteAlbum, checkAdmin } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// all routes in this file are protected and require admin access
router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);
router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);
router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

router.post("/users", (req, res) => {
  // Logic to create a new user
});

export default router;
