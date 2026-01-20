import express from "express";
import auth from "../middleware/auth.js";
import { updateProfile, deleteAccount } from "../controllers/profileController.js";

const router = express.Router();

router.put("/update", auth, updateProfile);
router.delete("/delete", auth, deleteAccount);

export default router;
