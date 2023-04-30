
const express = require("express")
const {userModel} = require("../model/auth")
const userRoute = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")




//  registering the user //


userRoute.post("/register", async (req,res)=>{

   let {name,email,pass} = req.body

   try{

       bcrypt.hash(pass, 10,async (err, hash)=>{
           
           if(err){
            console.log(err)
           }else{
       
    let user = new userModel({name,email,pass:hash})
   await user.save()
   res.send({"msg":"user registered successfully"})
   
           }
       })


   }
catch(err){

   res.send({"err":"user not registered","err":err.message})
}


})



//   logging in  the user 


userRoute.post("/login" , async (req,res)=> {

   let {email,pass} = req.body

   try{
       const user = await userModel.find({email})
  console.log(user)
       if(user.length>0){
// const detail={
    
// }
           bcrypt.compare(pass, user[0].pass, (err, result)=> {
       
               if(result){
                   const token = jwt.sign({ userID: user[0]._id  }, 'masai');
                   
            res.send({"msg":"Login successfull","token":token,})
               }else{
                   res.send({"msg":"login failed"})
               }

           })

       }else{

        res.send({"msg":"login failed"})

       }
       
   }
   catch(err){

 res.send({"err":"user not logged in","err":err.message})
}
   })



module.exports = {userRoute}
