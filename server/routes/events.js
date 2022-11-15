const express = require('express');
const router = express.Router();
const { eventModel } = require('../models/Events');
const eventValidation = require('../controller/event.validator');
const errorFunction = require('../../client/src/utilities/errorfunction');

// Add an event
router.post('/createEvent', eventValidation, async (req, res) => {
    try {
        await eventModel.create({
            influencerName: req.body.influencerName,
            influencerID: req.body.influencerID,
            businessName: req.body.businessName,
            businessID: req.body.businessID,
            projectID: req.body.projectID,
            projectName: req.body.projectName,
            eventName: req.body.eventName,
            eventDescription: req.body.eventDescription,
            eventStartDate: req.body.eventStartDate,
            eventEndDate: req.body.eventEndDate,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error' });
        console.log(err);
        return res.json(errorFunction(true, "Error creating project"));
    }
})

// Retrieve all events
router.get("/getEvent", (req, res) => {
    eventModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// Retrieve a specific event
router.get("/getEvent/:id", (req,res) => {
    
    let eventId = req.params.id;

    eventModel.findById(eventId,(err,event) => {
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            event
        });
    });
});

// Update an event
router.put('/updateEvent/:id',(req,res) => {
    eventModel.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,updatedEvent) => {
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated succesfully"
            });
        }
    );
});

// Delete an event
router.delete('/deleteEvent/:id',(req,res) => {
    eventModel.findByIdAndRemove(req.params.id).exec((err,deletedEvent) => {
        if(err) return res.status(400).json({
            message:"Delete unsuccessful",err
        });

        return res.json({
            message:"Delete successful",deletedEvent
        });
    });
});

// Accept event
router.put('/acceptEvent/:id', async (req,res)=>{
    try{
        console.log('Event accepted');
        await eventModel.findByIdAndUpdate(req.params.id,{
            isAccepted:true
        }), res.json({status: 'ok'})
    }catch(err){
        console.log(err);
        res.json({status:'error'});
    }
})

// Reject event
router.put('/rejectEvent/:id', async (req,res)=>{
    try{
        console.log('Event rejected');
        await eventModel.findByIdAndUpdate(req.params.id,{
            isAccepted:false
        }), res.json({status: 'ok'})
    }catch(err){
        console.log(err);
        res.json({status:'error'});
    }
})


module.exports = router;