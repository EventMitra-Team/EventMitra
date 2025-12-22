import express from "express";
import auth from "../middleware/auth.js";
import { createBooking, getMyBookings, getBookingPDF } from "../controllers/BookingController.js";

const router = express.Router();

router.post("/", auth, createBooking);

// BookingRoutes.js
router.get("/my", auth, getMyBookings);

//view ticket in pdf after booking 
router.get("/:bookingId/pdf", getBookingPDF);

export default router;
