const mongoose = require('mongoose')
const clientSchema = mongoose.Schema({
   
    ice:{
        type:String,
        required:[true,"Please add a email field"],
        unique:true 
    },
    latitude:{
        type: Number,
        required:[true,"Please add a password field"]
    },
    langitude:{
        type:Number,
        required:[true,"Please add a password field"]
    },
    email:{
        type:String,
        required:[true,"Please add a password field"]
    },
    password:{
        type:String,
        required:[true,"Please add a password field"]
    },
    phone:{
        type:String,
        required:[true,"Please add a phone field"]
    },
    

    
})
module.exports = mongoose.model("Client",clientSchema)