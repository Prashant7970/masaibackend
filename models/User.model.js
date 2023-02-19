const mongoose=require("mongoose")

const userShema=mongoose.Schema({
    name:String,
    email:String,
    pass:String
})

const UserModel=mongoose.model("users",userShema)



module.exports={
    UserModel
}