const mongoose = require("mongoose")

const UserTaskSchema = new mongoose.Schema({
       userId:{
     type:mongoose.Schema.Types.ObjectId,
        ref:"auth"
    },
    
        taskId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"task"
        },
        status:String,
    
})

const userTask =  mongoose.model("UserTask",UserTaskSchema)
module.exports = userTask