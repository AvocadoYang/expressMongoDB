var express = require('express');
let userRouter = require('../controllers/user');
const handleErrorAsync = require('../errorHandle/handleErrorAsync');
var router = express.Router();


/* GET users listing. */
router.get('/' ,handleErrorAsync(userRouter.getUserInfo));

router.post('/logIn', handleErrorAsync(userRouter.logIn))

router.post('/signUp', handleErrorAsync(userRouter.signUp));

router.patch('/editInfo', handleErrorAsync(userRouter.editUserInfo));

router.delete('/', handleErrorAsync(userRouter.deleteUser));




module.exports = router;
