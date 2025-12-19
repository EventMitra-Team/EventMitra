import express from "express";
import auth from "../middleware/auth.js";
import {
  createEvent,
  getOrganizerEvents,
  getAllEvents,
  singleEvent,
  deleteEvent,
  publishEvent,
  editEvent
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/", auth, createEvent);
router.get("/organizer/:id", auth, getOrganizerEvents);
router.get("/", getAllEvents);
router.get("/:id", singleEvent);
router.delete("/:id", deleteEvent);
router.patch("/:id/status", publishEvent);
router.put("/:id", editEvent);

export default router;
