const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "user",
		unique: true,
		
	},
	category:{
		type:String,
		required:false,
	
	},
	category:{
		type: String,
		required: false,
	},

	adminVerified:{
		type:Boolean,
		required:false,
	},
	isActive:{
		type:Boolean,
		required:false,
	},
	isFirstLogin:{
		type:Boolean,
		required:false,
	},
	email:{
		type:String,
		required:false,
	},
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
});

module.exports = mongoose.model("token", tokenSchema);
