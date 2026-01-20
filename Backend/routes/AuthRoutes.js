import express from "express";
import { login,sendOtp, verifyOtp, register, registerOtp } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/registerOtp", registerOtp);


export default router;
