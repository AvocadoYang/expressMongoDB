const User = require('../models/user');
const header = require('../header');
const successHandle = require("../service/successHandle");
const customiError = require("../errorHandle/customiError");
const validator = require("validator");
const  bcrypt = require("bcryptjs");
const jwtFn = require("../midleware/auth");
const regex = /^(?=.*[a-z])(?=.*[A-Z])/; //密碼必須包含一個大小以及一個小寫



const user = {
    // admin get user data 
    async getUserInfo(req, res, next){
        const data = await User.find();
        successHandle(res, data);
    },

/**
    1.註冊成功後，直接導入會員頁面(singUp後直接回傳JWT)
    2.註冊成功後，要先驗證電話，不輕易導入到會員畫面
    3.註冊成功後，切到登入畫面，重新登入
 */

    // 註冊
    async signUp (req, res, next){
        let {name , email, photo, password, confirmPassword} = req.body;
        const emailCheck = await User.findOne({"email" : email});
        if(emailCheck)
            return next(customiError(400, "此email已被使用", next));

        if (!name || !email || !password || !confirmPassword)
            return next(customiError(400, "資料未填寫完整", next));

        if(password != confirmPassword){
            return next(customiError(400, "密碼輸入不一致", next));
        }

        if(!validator.isLength(password,{min : 8})){
            return next(customiError(400, "密碼格式錯誤", next));
        }

        if(!validator.isEmail(email))
            return next(customiError(400, "Email格式錯誤", next));
    
        let encrypPassword = await bcrypt.hashSync(password,12);
        let newUser = await User.create({
            "name" : name,
            "email" : email,
            "photo" : photo,
            "password" : encrypPassword
        });
        jwtFn.generateSendJWT(newUser, 200, res);
        // successHandle(res, newUser);
    },
    // 登入
    async logIn (req, res, next) {
        const { email, password} = req.body;
        if(!email || !password){
            return next(customiError(400,"無此帳號或密碼", next));
        }
        const user = await User.findOne({"email" : email}).select("+password");
        console.log(user)
        const auth = await bcrypt.compare(password, user.password);
        if(!auth){
            return next(customiError(400,"無此帳號或密碼錯誤！", next));
        }
        jwtFn.generateSendJWT(user, 200, res);
    },

    // edit user Info //有問題要修正
    async editUserInfo(req, res, next){
        let { name, email, photo, password } = req.body;
        const editID = await User.findOne({ _id : req.user.id}).catch((error) => {console.log(123);});
        if(editID == null){
            return next(customiError(400, "id not found", next));
        }  
        if(!name || !email){
            return next(customiError(400, "form error", next));
        }
        if(!validator.isEmail(email)){
            return next(customiError(400, "email form error",next));
        }
        if(!password){
            return next(customiError(400, "password is necessary", next))
        }
        const auth = await bcrypt.compare(password, req.user.password);
        if(!auth){
            let encrypPassword = await bcrypt.hashSync(password,12);
            let replaceData = await User.findOneAndUpdate({"_id" : req.user.id}, {  
                "name" :  name,
                "photo" : photo,
                "email" : email,
                "password" : encrypPassword
            })
            successHandle(res, replaceData);
        } else {
            let replaceData = await User.findOneAndUpdate({"_id" : req.user.id}, {  
                "name" :  name,
                "photo" : photo,
                "email" : email,
                "password" : encrypPassword
            })
            successHandle(res, replaceData);
        }
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




