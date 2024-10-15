const mongoose = require("mongoose")

let AuthSchema = new mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    role:String,
    active:Boolean,
})

const Authmodel = mongoose.model("auth",AuthSchema)
module.exports={Authmodel}