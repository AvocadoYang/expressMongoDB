const mongoose = require('mongoose');
const User = require('./user');

let postSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true, "Post ID is not filled"]
    },
    content : {
        type : String,
        required : [true, 'Content null']
    },
    image : {
        type : String,
        default : "http://urlTest.123"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    likes: {
        type:Number,
        default:0  
    },
    type : {
        type : String,
        enum : ['group', 'person'],
        default : 'group'
    },
    tags : {
        type : String,
        require : [true, "tag is not fill"]
    },
    comments : {
        type : Number,
        default : 0
    }
},{
    versionKey : false
});

const Post =  mongoose.model('Posts', postSchema);

module.exports = Post;
