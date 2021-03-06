var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const passport = require('passport');
const paypal = require('paypal-rest-sdk')
var cors=require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
require('./config/connection')
require('./middlewares/passport')(passport)
var session = require('express-session');
var flash = require('connect-flash');

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  next();
}
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'ATMGf77K9It38ZorVFEXX7PMABNWYcjIFxCsR69DBgRcNpftgo3tEJHSKB7UTDeQl51NLJ9LjkYmlXYe',
  'client_secret': 'ENeEZ6LqaW1F8Jy7GoqbnBWUBxQRHIiU_QkJOZREhMbim1pT7a2XCd7FfenitOHlLZV50mwCWXE58NeA'
});
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: "mysecret", resave: true, saveUninitialized: true, 
    cookie:{
      maxAge: 1000*60*3
    }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({origin:true,credentials: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(allowCrossDomain)
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/',indexRouter)
app.use('/user',usersRouter)



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

module.exports = app;
