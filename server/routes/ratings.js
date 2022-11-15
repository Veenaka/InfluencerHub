const express = require('express');
const router = express.Router();
const RatingsModel = require('../Models/Ratings');

// Retrieve all artings
router.get('/getRatings', async(req, res) => {
    RatingsModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// Add rating for business
router.post('/addRatingBusiness', async(req, res) => {
    try {
        await RatingsModel.create({
            ratingGivenTo:req.body.influencerID,
            ratingAddedBy:req.body.businessID,
            raterCategory:req.body.category,
            rating:req.body.currentValue
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error' });
        console.log(err);
    }
})

// Add rating for influencer
router.post('/addRatingInfluencer', async(req, res) => {
    try {
        await RatingsModel.create({
            ratingGivenTo:req.body.businessID,
            ratingAddedBy:req.body.influencerID,
            raterCategory:req.body.category,
            rating:req.body.currentValue
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error' });
        console.log(err);
    }
})

module.exports = router;