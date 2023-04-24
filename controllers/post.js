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

<<<<<<< HEAD

 async deletPosts(res, req, next){
}

=======
//delete Post
async deletPosts(res, req, next){
    const id = res.body.id;
    const postCheck = await Post.find({
        "id" : id
    })
    if(!postCheck){
        req.status(500).send({
            "statuss" : "false",
            "Error Message" : "ID not found"
        })
    } else {
        await Post.findByIdAndDelete(id);
        req.status(200).send({
            "statuss" : "success"
        })
    }
    
},

//edit user Posts
async editPosts(req, res, next){
    const { id, content, image, likes, comments } =  req.body;
    let postCheck = await Post.findOne({"_id" : id});
    if(!postCheck){
        return next(customiError("400", "ID not found", next));
    }
    if(!content){
        return next(customiError("400", "內容不得為空", next));
    }
    
    let updatePost = await Post.findByIdAndUpdate(id, {
        "content" : content,
        "image" : image,
        "likes" : likes ? likes : 0,
        "comments" : comments ? comments : 0
    })
    successHandle(res, updatePost);
}
>>>>>>> ca8c5bfd6c602d60ceecbd0267dfef24b864c0f5
}


module.exports = posts;




