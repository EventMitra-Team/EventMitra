import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  adminLogin,
  getPendingOrganisers,
  approveOrganiser,
  getAllOrganisers,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/organisers/pending", adminAuth, getPendingOrganisers);
router.get("/organisers/all", adminAuth, getAllOrganisers);
router.put("/organisers/:id/approve", adminAuth, approveOrganiser);

export default router;
