var express = require('express');
let userRouter = require('../controllers/user');
const handleErrorAsync = require('../errorHandle/handleErrorAsync');
var router = express.Router();


/* GET users listing. */
router.get('/' ,handleErrorAsync(userRouter.getUserInfo));

router.post('/', handleErrorAsync(userRouter.addUserInfo));

router.patch('/', handleErrorAsync(userRouter.editUser));

router.delete('/', handleErrorAsync(userRouter.deleteUser));




module.exports = router;
