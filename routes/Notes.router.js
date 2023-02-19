const express=require("express")
const { NoteModel } = require("../models/note.model")


const noteRouter=express.Router()


noteRouter.get("/",async(req,res)=>{
   
const notes=await NoteModel.find({user:req.body.user})
res.send(notes)
})

noteRouter.post("/create",async(req,res)=>{
const payload=req.body

try {
    const note=new NoteModel(payload)
    await note.save() 
    res.send("notes added")   
} catch (error) {
    res.send("something went wrong",error)
}

})

noteRouter.delete("/delete/:id",async(req,res)=>{
const noteid=req.params.id

await NoteModel.findByIdAndDelete({_id:noteid})
res.send({"msg":`note with id ${noteid} is deleted`})


})

noteRouter.patch("/update/:id",async(req,res)=>{
    const noteid=req.params.id
    const payload=req.body

await NoteModel.findByIdAndUpdate({_id:noteid},payload)
res.send({"msg":`note with id ${noteid} is updated`})

})

module.exports={
    noteRouter
}