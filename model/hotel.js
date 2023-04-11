const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    category:String ,
    image_url:String,
    type_of_room:String,
    bed_type: String,
    no_of_persons:String,
    capacity:String ,
    cost:String,
    booked:Boolean
   

})



const  hotelModel = mongoose.model("oyohotelmodel" , userSchema)


module.exports = {hotelModel}

