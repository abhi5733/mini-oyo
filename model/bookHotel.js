const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    category:String ,
    image_url:String,
    type_of_room:String,
    bed_type: String,
    no_of_persons:String,
    capacity:String ,
    cost:String,
    booked:Boolean,
    userID:String,
    prevID:String

})



const  bookhotelModel = mongoose.model("oyoBookedhotelmodel" , userSchema)


module.exports = {bookhotelModel}
