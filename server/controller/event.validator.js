const joi = require("joi");
const errorFunction = require("../../client/src/utilities/errorfunction");

const validation = joi.object({
    influencerName: joi.string().required(),
    businessName: joi.string().required(),
    influencerID: joi.string().hex().length(24),
    businessID: joi.string().hex().length(24),
    projectID: joi.string().hex().length(24),
    projectName: joi.string().required(),
    eventName: joi.string().required(),
    eventDescription: joi.string().required(),
    eventStartDate: joi.string().required(),
    eventEndDate: joi.string().required(),
    isAccepted: joi.string(),
});

const eventValidation = async (req, res, next) => {
    const event = {
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
        isAccepted: req.body.isAccepted,
    };

    const { error } = validation.validate(event);
    if (error) {
        res.status(406);
        return res.json(
            errorFunction(true, `Error in User Data : ${error.message}`)
        );
    } else {
        next();
    }
};

module.exports = eventValidation;