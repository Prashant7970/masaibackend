const mongoose=require("mongoose")

const noteShema=mongoose.Schema({
    title:String,
   body:String,
    user:String
})

const NoteModel=mongoose.model("note",noteShema)



module.exports={
    NoteModel
}