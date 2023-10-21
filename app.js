var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lbxRouter = require('./routes/lbx');
var ngocrongRouter = require('./routes/ngocrong');
var hbs = require('hbs')

//compare
hbs.registerHelper('eq', function(a, b) {
  return a == b;
});
hbs.registerHelper('gt', function(a, b) {
  return a > b;
});
hbs.registerHelper('lt', function(a, b) {
  return a < b;
});
hbs.registerHelper('noteq', function(a, b) {
  return a != b;
});

//mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://hieunvgch211262:Hieulol2k3@cluster0.gqfnwfi.mongodb.net/1644')
.then(()=> console.log('db connected'))
.catch(err => console.log(err))


var app = express();


//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lbx', lbxRouter);
app.use('/ngocrong', ngocrongRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


app.listen(process.env.PORT || 3001)
module.exports = app;
