const express = require('express');
let Post = require('../models/post');
let Header = require('../header');
const router = express.Router();

router.get('/', async (req, res) =>{
    try {
        let roomData = await Post.find().populate({
            path : "user",
            selecte : "name email"
        });
        console.log(roomData);
        res.set(Header);
        res.json({
            "status" :  "success",
            "data" : roomData
        });
    } catch (error){
        console.log(error);
        res.json({
            "status" : "false",
            "erro-message" : error
        })
    }
});

router.post('/addInfo', async (req, res) => {
    try{
        let newData = req.body;
        if(newData.content != undefined){
            await Post.create({
                name : newData.name,
                content : newData.content
            });
            
        }else {
            res.json({
                "status" : "false",
                "error" : "content is nessesary"
            })
        } 
    }catch(error) {
        res.send(error.errors);
    }
})

router.delete('/delete/:id', async (req, res) => {
    try{
        console.log(req.params);
    }
    catch(error) {
        
    }
})



module.exports = router;