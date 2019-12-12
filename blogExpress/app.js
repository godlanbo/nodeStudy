var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session)

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// 注册日志的插件
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  app.use(logger('dev', {
    stream: process.stdout
  }));
} else {
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}
// app.use(logger('dev', {
//   stream: process.stdout
// }));
// 注册json中间件
app.use(express.json());
// 将url参数解析到req.query
app.use(express.urlencoded({ extended: false }));
// 处理cookie
app.use(cookieParser());
// 配置session
const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'wjo_354!?',
  name: 'userid',
  resave: true,
  saveUninitialized: true,
  cookie: {
    path: '/',      // 默认配置
    httpOnly: true, // 默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}))
// 静态资源路径
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err.stack : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.json(res.locals);
});

module.exports = app;
