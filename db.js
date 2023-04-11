const mongoose = require("mongoose")
// require('dotenv').config()


const connection = mongoose.connect("mongodb+srv://abhijeet:abhijeet@cluster0.6oakvd5.mongodb.net/oyo?retryWrites=true&w=majority")



module.exports =  {connection} 