const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new mongoose.Schema({
  influencerName: {
    type: String,
    required: true,
  },
  influencerID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  businessID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  projectID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  projectName: {
    type: String,
    require: true,
  },
  eventName: {
    type: String,
    require: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  eventStartDate: {
    type: String,
    required: true,
  },
  eventEndDate: {
    type: String,
    required: true,
  },
  isAccepted: {
    type: String,
    required: false,
    default: null,
  },
});

const event = mongoose.model("addevents", EventSchema);
module.exports = { eventModel: event } 
