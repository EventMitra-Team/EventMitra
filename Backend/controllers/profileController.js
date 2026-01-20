import Attendee from "../models/Attendee.js";
import Organizer from "../models/Organizer.js";

export const updateProfile = async (req, res) => {
  try {
    const { id, role } = req.user;
    const { bio, location } = req.body;

    let updatedUser;

    if (role === "attendee") {
      updatedUser = await Attendee.findByIdAndUpdate(
        id,
        { bio, location },
        { new: true }
      );
    }

    if (role === "organizer") {
      updatedUser = await Organizer.findByIdAndUpdate(
        id,
        { bio, location },
        { new: true }
      );
    }

    if (!updatedUser) {
      return res.status(404).json({ success: false });
    }

    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

//Delete Account 

export const deleteAccount = async (req, res) => {
  try {
    const { id, role } = req.user;

    if (role === "attendee") {
      await Attendee.findByIdAndDelete(id);
    }

    if (role === "organizer") {
      await Organizer.findByIdAndDelete(id);
    }

    res.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (err) {
    console.error("DELETE ACCOUNT ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete account",
    });
  }
};
