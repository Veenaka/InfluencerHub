const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NotificationSchema = new mongoose.Schema({
  SenderId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  ReceiverId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  Eventhappened: {
    type: String,
    required: true,
  },
  NotificationTime: {
    type: String,
    required: true,
  },
  Notificationmessage: {
    type: String,
    required: true,
  },
  Seen: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = { Notification: Notification };
