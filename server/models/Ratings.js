const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new mongoose.Schema({
    ratingAddedBy: {
        type: Schema.Types.ObjectId,
        required: false,
    },
    ratingGivenTo: {
        type: Schema.Types.ObjectId,
        required: false,
    },
    raterCategory: {
        type: String,
        required: false,
    },
    rating: {
        type: Number,
        required: true,
    }
});

module.exports = RatingsModule = mongoose.model("addratings", RatingSchema);