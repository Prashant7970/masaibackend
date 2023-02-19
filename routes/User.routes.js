const express=require("express")
const { UserModel } = require("../models/User.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const appRouter=express.Router()


appRouter.post("/register",(req,res)=>{
const {name,email,pass}=req.body
try {
    bcrypt.hash(pass,5,async(err,hash)=>{
    if(err){
        res.send({"msg":"something went wrong","err":err})
    }else{
        const newuser=new UserModel({email:email,pass:hash})
        await newuser.save()
        res.send({"msg":"new user has been registered"})

    }
    })
    
} catch (error) {
    res.send({"msg":"something went wrong","err":error})
    
}

})
appRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        
        const user=await UserModel.find({email})
        if(user.length>0){

bcrypt.compare(pass,user[0].pass,(err,result)=>{
    if(err)  res.send({"msg":"something went wrong","err":err})

    if(result){
        let token=jwt.sign({userID:user[0]._id},"masai")
        res.send({"msg":"login succesfull","token":token})
    }else{
        res.send({"msg":"wrong credentials"}) 
    }
})


          
        }else{
res.send({"msg":"wrong credentials"})
        }
    } catch (error) {
         res.send({"msg":"something went wrong","err":error})
    }

})






module.exports={
    appRouter
}