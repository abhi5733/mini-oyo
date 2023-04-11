
const express = require("express")
const cors = require("cors")
const app = express()

const {connection} = require("./db")
const {authenticate} = require("./middlewares/authenticate")
const {userRoute} = require("./routes/userRoutes")
const {userRoute2} = require("./routes/userRoutes2")
const {adminRoute} = require("./routes/adminRoute")
app.use(express.json())
app.use(cors())
app.use("/user" ,userRoute)
app.use("/admin",adminRoute)
app.use(authenticate)
app.use("/user2",userRoute2)



app.listen(7300, async ()=>{

    try{
        await connection
        console.log("connected to db")

    }catch(err){
        console.log("cannot connected to db")
        console.log(err)
    }
    console.log(`server started at 7300`)
})