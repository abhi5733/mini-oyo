const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:String ,
    email:String,
    pass:String
})



const adminModel = mongoose.model("oyoAdminAuth" , userSchema)


module.exports = {adminModel}