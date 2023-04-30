var express = require('express');
let userRouter = require('../controllers/user');
const handleErrorAsync = require('../errorHandle/handleErrorAsync');
var router = express.Router();


/* GET users listing. */
router.get('/' ,handleErrorAsync(userRouter.getUserInfo));

router.post('/logIn', handleErrorAsync(userRouter.))

router.post('/sigUp', handleErrorAsync(userRouter.signUp));

router.patch('/editInfo', handleErrorAsync(userRouter.editUser));

router.delete('/', handleErrorAsync(userRouter.deleteUser));




module.exports = router;
