import Otp from "../models/Otp.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "../services/EmailService.js";
import Attendee from "../models/Attendee.js";
import Organizer from "../models/Organizer.js";


export const register = async (req, res) => {
 
   try {
     const { name, email, phone, password, role } = req.body;
 
     if (!["attendee", "organizer"].includes(role)) {
       return res.status(400).json({ message: "Invalid role ❌" });
     }
 
     const emailRegex = /^(?!\.)(?!.*\.\.)[A-Za-z0-9._+\-$]+(?<!\.)@[A-Za-z0-9-]+(\.[A-Za-z]{2,})+$/;
     const phoneRegex = /^[0-9]{10}$/;
     const passwordRegex =
       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
 
     if (!emailRegex.test(email)) {
       return res.status(400).json({
         message: "Check your mail ✉️🔎",
       });
     }
 
 
     if (!phoneRegex.test(phone)) {
       return res.status(400).json({
         message: "Mobile number must be exactly 10 digits",
       });
     }
 
 
     if (!passwordRegex.test(password)) {
       return res.status(400).json({
         message:
           "Password must be 8+ characters with uppercase, lowercase, number & special character",
       });
     }
 
 
     const exists =
       await Attendee.findOne({ email }) ||
       await Organizer.findOne({ email });
 
     if (exists) {
       return res.status(400).json({ message: "Email already exists ❌" });
     }
 
 
     const hashedPassword = await bcrypt.hash(password, 10);
 
 
     if (role === "attendee") {
       await Attendee.create({
         name,
         email,
         phone,
         password: hashedPassword,
       });
     } else {
       await Organizer.create({
         name,
         email,
         phone,
         password: hashedPassword,
         status: "pending"
       });
 
 
     }
 
     res.status(201).json({
       message: "Registered successfully 🎉",
     });
 
   } catch (error) {
     console.error(error);
     res.status(500).json({
       message: "Server error ❌",
     });
   }
 };


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Attendee.findOne({ email });
    let role = "attendee";

    if (!user) {
      user = await Organizer.findOne({ email });
      role = "organizer";
    }

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password ❌" });
    }

    // 🔒 ONLY organizer needs admin approval
    if (role === "organizer") {
      if (user.status === "pending") {
        return res.status(403).json({
          message: "Your account is waiting for admin approval",
        });
      }
      if (user.status === "inactive") {
        return res.status(403).json({
          message: "Your account is blocked by admin",
        });
      }
    }

    const token = jwt.sign(
      { id: user._id, role },
      SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful 🎉",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bio: user.bio || "",
        location: user.location || "",
        role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error ❌" });
  }
};


// 🔐 SEND OTP
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    });

    await sendOtpEmail(email, otp);

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("Send OTP Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ VERIFY OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email, otp });

    if (!record) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    await Otp.deleteMany({ email });

    res.json({ success: true, message: "Email verified" });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🧾 REGISTER USER (AFTER OTP VERIFIED)
export const registerOtp = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    const existingUser = await Organizer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Organizer.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      isVerified: true,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};




