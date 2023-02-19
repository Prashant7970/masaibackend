const express=require("express")
const { connection } = require("./db")
const { authenticate } = require("./middlewares/auth.middleware")
const { noteRouter } = require("./routes/Notes.router")
const { appRouter } = require("./routes/User.routes")
const cors=require("cors")
const app=express()
require('dotenv').config()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("pdhna likhna sadhe 22 aaya bdaa api bnanne")
})
app.use("/users",appRouter)
app.use("/notes",authenticate,noteRouter)










app.listen(process.env.port,async()=>{
    try {
        
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log("can't connect to db",error)
        
    }
    console.log("server is running at 4500")
})

















