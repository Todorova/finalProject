var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongodb =require("mongodb");
var monk =require("monk");
var mongoPassword=process.env.MONGO_PASS;
var db = monk(`mongodb://ittalents:ittalents@ds251179.mlab.com:51179/it-talents-final-project`);
var session = require('express-session');



var db = monk(`mongodb://ittalents:ittalents@ds251179.mlab.com:51179/it-talents-final-project`);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/news');
var loginRouter = require('./routes/login');
var waitingRouter = require('./routes/waitingNews');
var menuRouter = require('./routes/menu');
var categoriesRouter = require('./routes/categories');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

function checkLogin(req, res, next) {
  if ((req.session) && (req.session.user)) {
    next();
  } else {
    res.status(401);
    res.json({ status: 'not authorized' });
  }
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '1234',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 600000000 }
}));

app.use(function(req, res, next){
  req.db = db;
  next();
});

app.use('/', indexRouter);
app.use('/users/login', loginRouter)
app.use('/users', usersRouter);
app.use('/news', newsRouter);
app.use('/menu', menuRouter);
app.use('/categories', categoriesRouter);
app.use('/waitingNews', waitingRouter);

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
