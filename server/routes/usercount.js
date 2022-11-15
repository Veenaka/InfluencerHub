const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const UserCount = require('../models/UserCount');
const NVUserCount = require('../models/NonVerifiedUserCount');

router.get('/', (req, res) => {
    UserCount.find()
        .then(items => res.json(items))
});

router.get('/nonapproved', (req, res) => {
    NVUserCount.find()
        .then(items => res.json(items))
});


module.exports = router;