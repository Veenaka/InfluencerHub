const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserCountSchema = new Schema({
    userCount:{
        type:Number,
        required:false
    },
    time:{
        type:String,
        required:false
    }
})

module.exports = UserCount = mongoose.model('UserCount',UserCountSchema);