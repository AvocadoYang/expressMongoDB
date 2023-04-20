const express = require('express');
const post = require('../controllers/post')
const router = express.Router();

router.get('/', post.getPosts);
router.post('/', post.creatPosts);


module.exports = router