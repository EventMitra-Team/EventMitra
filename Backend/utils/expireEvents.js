import Event from "../models/Event.js";

const expireOldEvents = async () => {
  try {
    const now = new Date();

    await Event.updateMany(
      {
        date: { $lt: now },
        eventState: "upcoming",
      },
      {
        $set: { eventState: "expired" },
      }
    );

    console.log("✅ Old events marked as expired");
  } catch (error) {
    console.error("❌ Expire event job failed:", error.message);
  }
};

export default expireOldEvents;
