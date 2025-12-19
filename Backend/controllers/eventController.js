import Event from "../models/Event.js";

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      organizerId: req.user.id, // 🔑 FROM TOKEN
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

// GET ORGANIZER EVENTS
export const getOrganizerEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizerId: req.user.id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching organizer events" });
  }
};

// GET ALL PUBLISHED EVENTS
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "published" });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

// GET SINGLE EVENT BY ID (PUBLIC)
export const singleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("organizerId", "name email phone");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Invalid event ID" });
  }
};
