var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('lodash');

var index = require('./routes/index'),
    users = require('./routes/users'),
    task = require('./routes/task'),
    images = require('./routes/images');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes validations

// app.use(function (req, res, next){
//   console.log("req url: ", req.originalUrl);
//   if (_.includes(req.originalUrl, '/') || _.includes(req.originalUrl, '/bee/sendmsg')
//       || _.includes(req.originalUrl, '/activation') || _.includes(req.originalUrl, '/registereduser')) {
//     next();
//   } else {
//     res.status(401).send({error: "Access denied"})
//   }
// });

app.use('/', index);
app.use('/users', users);
app.use('/', task);
app.use('/', images);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
