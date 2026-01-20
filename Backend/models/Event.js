import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    totalTickets: {
      type: Number,
      default: 100,
    },
    soldTickets: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    eventState: {
  type: String,
  enum: ["upcoming", "expired"],
  default: "upcoming",
},


    //  INSERT organizerId HERE 
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },

    status: {
  type: String,
  enum: ["pending", "published", "rejected"],
  default: "pending",
},


   
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
