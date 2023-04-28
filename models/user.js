const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {  
        name : {
            type : String,
            required : [true, "Please fill your name."]
        },
        email : {
            type : String,
            required : [true, "Please fill your Email"],
            unique : true,
            lowercase : true,
        },
        password : {
            type : String,
            required : [true, "Password is necessary"],
            select : false
        },
        photo : String    
    },
    {versionKey : false} 
)


const User = mongoose.model("User", userSchema);

module.exports = User;
