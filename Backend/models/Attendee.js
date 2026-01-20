import mongoose from "mongoose";
const attendeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,

  bio: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
});
const Attendee = mongoose.model("Attendee", attendeeSchema);
export default Attendee;