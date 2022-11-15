const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
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
  projectName: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  projectStartDate: {
    type: String,
    required: true,
  },
  projectEndDate: {
    type: String,
    required: true,
  },
  isAccepted: {
    type: String,
    required: false,
    default: null,
  },
  isRatedInfluencer: {
    type: Boolean,
    required: false,
    default: false,
  }, 
  isRatedBusiness: {
    type: Boolean,
    required: false,
    default: false,
  }
});

const project = mongoose.model("addprojects", ProjectSchema);
module.exports = { projectModel: project }