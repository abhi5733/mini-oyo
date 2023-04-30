
const express = require("express")
const {adminModel} = require("../model/admin")
const {hotelModel} =require("../model/hotel")
const {bookhotelModel} = require("../model/bookHotel")
const userRoute2 = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



userRoute2.post("/book",async (req,res)=>{
    
    const {userID , bed_type,booked,capacity,  category, cost, image_url,no_of_persons, type_of_room , _id} = req.body
    
  
    const payload={bed_type,
        booked:true,
         capacity,
        category,
    cost,
    image_url,no_of_persons,
    type_of_room}

    const payload1={bed_type,
    booked:true,
     capacity,
    category,
cost,
image_url,no_of_persons,
type_of_room,userID
, prevID:_id}
    try{
       
        let user = new bookhotelModel(payload1)
        await user.save()

          await hotelModel.findByIdAndUpdate({_id},payload)
         res.send({"msg":"booked successfully"})
     

    }catch(err){

        res.send({"msg":"something wrong"})

    }


})


userRoute2.get("/getmyRoom", async (req,res)=>{

try{
    let rooms = await bookhotelModel.find({userID:req.body.userID})
res.send(rooms)

}catch(err){
    res.semd(err)

}

})




userRoute2.delete("/deleteRooms/:id" , async (req,res)=>{

    let id = req.params.id
  
    const payload={
        booked:false
    }
   id =  id.slice(1,25)
   let room = await bookhotelModel.findByIdAndUpdate({_id:id},payload)
   let  prev = room.prevID
  
    try{
        await hotelModel.findByIdAndUpdate({_id:prev},payload)


    await bookhotelModel.findByIdAndDelete({_id:id})
   res.send({"msg":"updated successfully"})

      


    }catch(err){
        console.log(3)
        console.log(err)
    }


} )


module.exports = {userRoute2}