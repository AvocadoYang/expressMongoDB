const Post = require('../models/post');
const header = require('../header');
const User = require('./user');
const successHandle = require('../service/successHandle');
const customiError = require('../service/customiError');

const posts = {
// get post Info
async getPosts(req , res, next){
    try{
        if(req.query.timeSort != undefined || req.query.q != undefined){
            const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createdAt"
            console.log(req.query, timeSort)
            const query = req.query.q !== undefined ? new RegExp(req.query.q) : {};
            const postData = await Post.find(
                {$or : 
                [   { type : {$in : [query] } },
                    { content : { $regex : query}}
                ]
            },{ _id : false }).populate({
                path : "user", 
                select : "name email -_id"
            }).sort(timeSort);
            console.log(postData);
            successHandle(res, postData);
        } else {
            postData = await Post.find({},{_id : false}).populate({
                path : "user",
                select : "name email -_id"
            });
            successHandle(res, postData);
        }
    }catch(error){
        res.set(header);
        res.status(400)
        res.json({
            "status" : "false",
            "Error message" : error
        })
    }
},

// cereat new Post
async creatPosts(req, res, next){
    try{
        if(req.body !== undefined){
            const { body }  = req;
            console.log(body);
            const newPosts = await Post.create({
                user : body.userId,
                tag : body.tag,
                type : body.type,
                content : body.content,
            });
            successHandle(res, newPosts);
        }
    } catch(error){
        console.log(error);
        res.json({
            "status" : "false",
            "error message" : error.errors
        })
    }
},


 async deletPosts(res, req, next){
}

}


module.exports = posts;




