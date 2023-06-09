const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const header = require('./header');
const mongoose = require('mongoose');

require("dotenv").config({path : './config.env'})
const resError = require("./errorHandle/resError");
const url = `mongodb+srv://avocado:${process.env.MONGODB_PASSWORD}@test.eyfsjjn.mongodb.net/test`;
mongoose.connect(url).then(()=>{console.log("connect success")}).catch(err => {console.log(err)});
require("./errorHandle/processError");

let postRouter = require('./routes/post');
let usersRouter = require('./routes/users');
const { log } = require('console');
const { resErrorProd } = require('./errorHandle/envError');

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
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  //dev
  console.log(err)
  if(process.env.NODE_ENV === "dev"){
    return resError.ErrorDev(err,res);
  }
  //production
  if(err.name === "validationError"){
    err.message = "資料欄位未填寫正確！";
    err.isOperational = true;
    return resError.ErrorProd(err, res);
  }
  resError.ErrorProd(err, res);
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // // res.status(err.status || 500);
  // res.render('error');
});


module.exports = app;
