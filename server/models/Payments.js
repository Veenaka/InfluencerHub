const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new mongoose.Schema({
  paidto: {
    type: String,
    required: false,
  },
  influencerId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  paidby: {
    type: String,
    required: false,
  },
  businessId: {
    type: Schema.Types.ObjectId,
    required: false,
  },

  project: {
    type: String,
    require: false,
  },
  amount: {
    type: Number,
    require: false,
  },
 

  time: {
    type: String,
    required: false,
  },

});

module.exports = mongoose.model("Payments",PaymentSchema)

