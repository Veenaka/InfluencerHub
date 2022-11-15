const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const cors = require('cors');
//const passwordComplexity = require("joi-password-complexity");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: false },
	businessName: { type: String, required: false },
	businessAddress: { type: String, required: false },
	lastName: { type: String, default:'' },
	email: { type: String, required: true },
	phoneNo:{type:String, required:false},
	password: { type: String, required: true },
	category:{ type: String, required: true },
	isFirstLogin:{type:Boolean,default:true},
	adminVerified:{type:Boolean,default:false},
	suspendedDate:{type:Date,required:false},
	restoreDate:{type:Date,required:false},
	verified:{type:Boolean,default:false},
	isActive:{type:Boolean,default:true},
	dob:{type:Date,required:false},
	product:{ type: String, required: false },
	address:{ type: String, required: false },
	weblink:{ type: String, required: false },
	img:{ type: String, default:"" },
	fblink:{ type: String, required: false },
	instalink:{ type: String, required: false },
	paypal:{ type: String, required: false },
	rating:{ type: Number, required: false },
});

//create user token
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id,
		category:this.category,
		adminVerified:this.adminVerified,
		isActive:this.isActive,
		isFirstLogin:this.isFirstLogin,
		email:this.email
	 },
		process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().label("First Name"),
    businessName: Joi.string().label("Business Name"),
    businessAddress: Joi.string().label("Business Address"),
    lastName: Joi.string().label("Last Name"),
    email: Joi.string().email().label("Email"),
    password: passwordComplexity().label("Password"),
    category: Joi.string().label("Category"),
    verified: Joi.string().label("Verified"),
    isActive: Joi.string().label("Active"),
  });
  return schema.validate(data);
};

module.exports = { User: User, validate };
