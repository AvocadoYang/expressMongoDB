const jwt = require("jsonwebtoken");
const customiError = require("../service/customiError");
const handleErrorAsync = require("../service/handleErrorAsync");
const User = require("../models/user");

let jwtFun = {
    isAuth : handleErrorAsync(async (req, res, next) => {
        //驗證token是否存在
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token){
            return next(customiError(400,'尚未登入',next));
        }
        //比對token正確性
        const decryptPayload  = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
                if(err){ 
                    reject(err);
                } else {
                    resolve(payload);
                }
            })
        })
        const currentUser = await User.findById(decryptPayload.id).select('+password');
        req.user = currentUser;
        next();
    }),
    generateSendJWT : (user, statusCode, res) => {
        //產生JWT token
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET,{expiresIn : process.env.JWT_EXPIRES_DAY});
        user.password = undefined;
        res.status(statusCode).send({
            status : "success",
            user : { 
                token,
                name : user.name
            }
        })
    }
}

module.exports = jwtFun;