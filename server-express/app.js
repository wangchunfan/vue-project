var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//设置新的路由
var goodsRouter = require('./routes/goods')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//设置HTML引擎，不是用jade
var ejs = require('ejs')
app.engine('.html', ejs.__express)
app.set('view engine', 'html')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
//设置静态文件路径
app.use(express.static(path.join(__dirname, 'views')));

//登录拦截
app.use(function (req, res, next) {
  console.log('originalUrl:' + req.originalUrl)//  originalUrl:/goods?page=1&pageSize=8&sort=1&priceLevel=all
  console.log('path:' + req.path) // path:/goods
  if (req.cookies.userId) {
    //如果已经登录，则直接运行
    next()
  } else {
    //未登录白名单
    if (req.originalUrl == '/users/login' ||
      req.originalUrl == '/users/logout' ||
      req.path == '/goods') {
      next()
    } else {
      res.json({
        status: '1001',
        msg: '当前未登录',
        result: ''
      })
    }
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
//设置二级路由
app.use('/goods', goodsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
