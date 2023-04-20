var express = require('express');
let userRouter = require('../controllers/user');
var router = express.Router();


/* GET users listing. */
router.get('/' ,userRouter.getUserInfo);

router.post('/', userRouter.addUserInfo);



module.exports = router;
