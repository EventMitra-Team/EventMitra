import express from "express";
import razorpay from "../services/razorpay.js";

const router = express.Router();

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ message: "Amount required" });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "event_" + Date.now(),
    });

    res.json(order);
  } catch (err) {
    console.error("RAZORPAY:", err);
    res.status(500).json({ message: "Payment failed" });
  }
});

export default router;
