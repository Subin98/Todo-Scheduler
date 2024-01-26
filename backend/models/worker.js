const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const workerSchema = new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    isActive:{
        type:Boolean
    },
    role:{
        type:String
    },
   password: {
        type:String
    }
})

const workers = mongoose.model('workers',workerSchema);

module.exports = workers;