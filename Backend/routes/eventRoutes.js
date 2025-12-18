import express from "express";
import auth from "../middleware/auth.js";
import {
  createEvent,
  getOrganizerEvents,
  getAllEvents
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/", auth, createEvent);
router.get("/organizer/:id", auth, getOrganizerEvents);
router.get("/", getAllEvents);

export default router;
