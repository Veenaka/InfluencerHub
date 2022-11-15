const joi = require("joi");
const errorFunction = require("../../client/src/utilities/errorfunction");

const validation = joi.object({
  influencerName: joi.string().required(),
  businessName: joi.string().required(),
  influencerID: joi.string().hex().length(24),
  businessID: joi.string().hex().length(24),
  projectName: joi.string().required(),
  projectDescription: joi.string().required(),  
  projectStartDate: joi.string().required(),
  projectEndDate: joi.string().required(),
  isAccepted: joi.string(),
  isRated: joi.boolean(),
});

const projectValidation = async (req, res, next) => {
  const project = {
     influencerName: req.body.influencerName,
     influencerID: req.body.influencerID,
     businessName: req.body.businessName,
     businessID: req.body.businessID,
     projectName: req.body.projectName,
     projectDescription: req.body.projectDescription,
     projectStartDate: req.body.projectStartDate,
     projectEndDate: req.body.projectEndDate,
     isAccepted: req.body.isAccepted,
};

  const { error } = validation.validate(project);
  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, `Error in User Data : ${error.message}`)
    );
  } else {
    next();
  }
};

module.exports = projectValidation;