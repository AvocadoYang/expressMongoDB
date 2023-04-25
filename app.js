const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const header = require('./header');
const mongoose = require('mongoose');
const axios = require("axios");

const appError = require("./service/appError");

mongoose.connect("mongodb://127.0.0.1:27017/test").then(()=>{console.log("connect success")});
require("./service/processError");
// let postsRouter = require('./routes/postRoute');
let postRouter = require('./routes/post');
let usersRouter = require('./routes/users');

// require("./service/processError")

const app = express();

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
  res.status(400).send({
    "status" : "error",
    "errorMessage" : "無此路由"
  })
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
