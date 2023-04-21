var express = require('express');
let userRouter = require('../controllers/user');
var router = express.Router();


/* GET users listing. */
router.get('/' ,userRouter.getUserInfo);

router.post('/', userRouter.addUserInfo);

router.patch('/', userRouter.editUser);

router.delete('/', userRouter.deleteUser);




module.exports = router;
