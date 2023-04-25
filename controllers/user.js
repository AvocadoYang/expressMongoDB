const User = require('../models/user');
const header = require('../header');
const successHandle = require("../service/successHandle");
const customiError = require("../service/customiError");
const validator = require("validator");

const user = {
    // get user data
    async getUserInfo(req, res, next){
        const data = await User.find();
        successHandle(res, data);
    },
    // add user
    async addUserInfo (req, res, next){
        let {name , email, photo, password} = req.body;
        const emailCheck = await User.findOne({"email" : email});
        console.log(emailCheck);
        if(emailCheck)
            return next(customiError("400", "email duplicate", next));

        if (!name || !email)
            return next(customiError("400", "field error", next));
        
        if(!validator.isEmail(email))
            return next(customiError("400", "Email form error", next));
        
        let newUser = await User.create({
            "name" : name,
            "email" : email,
            "photo" : photo,
            "password" : password
        });
        successHandle(res, newUser);
    },

    // edit user Info
    async editUser(req, res, next){
        let { name, email, id, photo} = req.body;
        const editID = await User.findOne({ _id : id}).catch((error) => {console.log(123);});
        console.log(editID)
        if(editID == null){
            return next(customiError("400", "id not found", next));
        }  
        if(!name || !email){
            return next(customiError("400", "form error", next));
        }
        if(!validator.isEmail(email)){
            return next(customiError("400", "email form error",next));
        }
        
        let replaceData = await User.findOneAndReplace(id, {
            "name" :  name,
            "email" : email,
            "id" : id,
            "photo" : photo
        })
        successHandle(res, replaceData);
    },

    // delete user Info
    async deleteUser(req, res, next){
        let id = req.body.id
        let userCheck = await User.findOne({
            "_id" : id
        })
        if(!userCheck){
            return next(customiError("400", "id not found", next));
        }
        let deleteUser = await User.findByIdAndRemove(id);
        successHandle(res, deleteUser);
    }
}


module.exports = user;




