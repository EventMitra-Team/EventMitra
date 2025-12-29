import Event from "../models/Event.js";

// Create an event 
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      organizerId: req.user.id, 
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

export const eventToAdmin = async (req, res) => {
  try {
    const events = await Event.find({ status: "pending" })
      .populate("organizerId", "name email phone");

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pending events" });
  }
};

// Approve Event 
export const eventToApprove = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.status = "published";
    await event.save();

    res.json({ message: "Event approved & published" });
  } catch (err) {
    res.status(500).json({ message: "Event approval failed" });
  }
};

// Reject Event

export const eventToReject = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.status = "rejected";
    await event.save();

    res.json({ message: "Event rejected successfully" });
  } catch (err) {
    res.status(500).json({ message: "Event rejection failed" });
  }
};





// Get Organiser event
export const getOrganizerEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizerId: req.user.id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching organizer events" });
  }
};

// get all event published
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "published" });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

// Get Single event by id
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

// Delete Single Event by ID
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event" });
  }
};
// Publish or Unpublish Single Event 

export const publishEvent = async (req, res) => {
  try {
    const { status } = req.body; 

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

// Edit Event 

export const editEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Failed to update event" });
  }
};


