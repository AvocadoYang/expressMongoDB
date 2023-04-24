const Post = require('../models/post');
const header = require('../header');
const User = require('./user');

const posts = {

async getPosts(req , res, next){
    try{
        if(req.query.timeSort != undefined || req.query.q != undefined){
            const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createdAt"
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
            res.set(header);
            res.json({
                "status" : "success",
                "data" : postData
            })
        } else {
            postData = await Post.find().populate({
                path : "user",
                select : "name email"
            });
            res.status(200).json({
                "status" : "success",
                "data" : postData
            })
        }
    }catch(error){
        res.set(header);
        res.status("400")
        res.json({
            "status" : "false",
            "Error message" : error
        })
    }
},


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
                image : body.image
            });
            res.set(header)
            res.json({
                "status" : "success",
                newPosts
            })
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




