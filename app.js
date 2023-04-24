const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
<<<<<<< HEAD
const cors = require('cors');
const logger = require('morgan');
const header = require('./header');
const mongoose = require('mongoose');
const axios = require("axios");

const appError = require("./service/appError");

=======
const logger = require('morgan');
const header = require('./header');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
// let token = jwt.sign(JSON.stringify({ foo : "bar"}), "shhhhh");
// console.log(token)
// jwt.verify(token, 'shhhhh', function(err, decoded) {
//   console.log(decoded.foo) // bar
// });
>>>>>>> ca8c5bfd6c602d60ceecbd0267dfef24b864c0f5
mongoose.connect("mongodb://127.0.0.1:27017/test").then(()=>{console.log("connect success")});
require("./service/processError");
// let postsRouter = require('./routes/postRoute');
let postRouter = require('./routes/post');
let usersRouter = require('./routes/users');

<<<<<<< HEAD
// require("./service/processError")

const app = express();

=======
var app = express();
>>>>>>> ca8c5bfd6c602d60ceecbd0267dfef24b864c0f5
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/post', postRouter);
app.use('/user', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
<<<<<<< HEAD
  res.status(400).send({
    "status" : "error",
    "errorMessage" : "無此路由"
  })
=======
  console.log(123)
  next(createError(404));
>>>>>>> ca8c5bfd6c602d60ceecbd0267dfef24b864c0f5
});

// error handler
app.use(function(err, req, res, next) {
  console.log(123)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
