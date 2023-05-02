
const express = require("express")
const {adminModel} = require("../model/admin")
const {hotelModel} =require("../model/hotel")
const adminRoute = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


// register new admin from here

// adminRoute.post("/register", async (req,res)=>{

//     let {name,email,pass} = req.body
 
//     try{
 
//         bcrypt.hash(pass, 10,async (err, hash)=>{
            
//             if(err){
//              console.log(err)
//             }else{
        
//      let user = new adminModel({name,email,pass:hash})
//     await user.save()
//     res.send({"msg":"user registered successfully"})
    
//             }
//         })
 
//     }

//  catch(err){
 
//     res.send({"err":"user not registered","err":err.message})
//  }
 
 
//  })
 
 
 
 //   logging in  the user 
 

 
 adminRoute.post("/login" , async (req,res)=>{
 
    let {email,pass} = req.body
 
    try{
        const user = await adminModel.find({email})
   
        if(user.length>0){
 
            bcrypt.compare(pass, user[0].pass, (err, result)=> {
        
                if(result){
                    const token = jwt.sign({ userID: user[0]._id  }, 'masai');
                    
             res.send({"msg":"Login successfull","token":token})
                }else{
                    res.send({"err":"login failed"})
                }
 
            })
 
        }else{
 
            res.send({"err":"login failed"})
 
        }
        
    }
    catch(err){
 
  res.send({"err":"user not logged in","err":err.message})
 }
 
  
 
    })


    adminRoute.post( "/create", async (req,res)=>{

        try{

      let room = new hotelModel(req.body)
      await room.save()
      res.send("room created successfully")
        }catch(err){
            console.log(err)
        }
    })

    adminRoute.delete("/delete/:id" , async (req,res)=>{

        try{

            let id = req.params.id
            let room = await hotelModel.findByIdAndDelete({_id:id})
            res.send({"msg":"hotel deleted successfully"})

        }catch(err){
            res.send(err)
        }

    })


 

    
    adminRoute.get("/" , async (req,res)=>{

        let query = req.query
        let page = req.query.page
        let category = req.query.category || []
       let location = req.query.location || ""
      let type = req.query.type || []

    try{
 let rooms
  if(category.length>0 && location && type.length>0 ){
    rooms = await  hotelModel.find({category,location,type_of_room:type}).limit(10).skip(page)
 }else{
    rooms = await hotelModel.find().limit(10).skip(page)
 }
//  else if(category.length>0  && location ){
//     rooms = await  hotelModel.find({category,location}).limit(10).skip(page)
//  }else if(category.length>0  && type.length>0 ){
            
//             rooms = await  hotelModel.find({category,type_of_room:type}).limit(10).skip(page)
             
//     }else if(location && type.length>0 ){
//             rooms = await hotelModel.find({location,type_of_room:type}).limit(10).skip(page)
//     }else if(location.length>0 ){
//         rooms = await  hotelModel.find({location}).limit(10).skip(page)
//     }else if(type.length>0 ){
//         rooms = await  hotelModel.find({type_of_room:type }).limit(10).skip(page)
//     }else if(category.length>0 ){
//         rooms = await  hotelModel.find({category:query.category}).limit(10).skip(page)
//     }else{
//              rooms = await hotelModel.find().limit(10).skip(page)
//          }
  
     res.send(rooms)
// res.send(location,category,type)
 
 
    }catch(err){
     res.send({"msg":"error","err":err.message})
    }
 
 
 })

 


//  let id = req.body.userID
//  let query = req.query
// let posts
// try{

//     posts = await noteModel.find({userID:id})
//    if(posts.length===0){
//        return res.send({"msg":"posts not found"})
//    }else{

//         if(query.device){
//            posts = await noteModel.find({device:query.device})
//         }else if(query.device1 && query.device2){
//            posts = await noteModel.find(  {device:query.device1 ,device: query.device2})
//         }

//        res.send(posts)
//    }
 

 
    

 
 adminRoute.patch("/update/:id" , async (req,res)=>{

    try{
    let id = req.params.id
    let payload = req.body
    let rooms = await hotelModel.findByIdAndUpdate({_id:id},payload)
 res.send({"msg":"room updated successfully"})
    }catch(err){
        res.send(err)
    }

 })

 
 module.exports = {adminRoute}
 

