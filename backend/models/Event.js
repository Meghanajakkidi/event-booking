const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    eventName:String,
    eventlocation:String,
    eventtiming:String,
    eventamount:String,
    status:String,
    assigned:{
        type:Boolean,
        required:true
    }
    
})

const Taskmodels = mongoose.model("task",TaskSchema)
module.exports={Taskmodels}