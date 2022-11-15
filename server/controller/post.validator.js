const joi = require("joi");
const errorFunction = require("../../client/src/utilities/errorfunction");

const validation = joi.object({
  PostTopic: joi.string().required(),
  Postdescription: joi.string().required(),
  PostAuthorID: joi.string().required(),
});

const postValidation = async (req, res, next) => {
  const post = {
    PostTopic: req.body.PostTopic,
    Postdescription: req.body.Postdescription,
    PostAuthorID: req.body.PostAuthorID,
  };

  const { error } = validation.validate(post);
  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, `Error in User Data : ${error.message}`)
    );
  } else {
    next();
  }
};

module.exports = postValidation;
