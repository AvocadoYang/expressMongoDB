const User = require('../models/user');
const header = require('../header');
console.log(User);
getUserInfo = async (req, res) =>{
    await User.find();
}

addUserInfo = async (req, res) => {
    let newUser = await User.create(req.body);
    res.status(200).json({
        "status" : "success",
        "data" : newUser
    })
}

module.exports = {getUserInfo, addUserInfo};