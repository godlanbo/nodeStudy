var express = require('express')
var fortune = require('./lib/fortune.js')
var app = express()
// 配置handlebars模板引擎在express上
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'})
app.engine('handlebars', handlebars.engine)
app.set('view engine' ,'handlebars')
// 创建static中间件
app.use(express.static(__dirname + '/public'))

app.set('port', process.env.PORT || 3000)

app.use((req, res, next) => {
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1'
  next()
})
// 路由
app.get('/', (req, res) => {
  res.render('home')
})
app.get('/about', (req, res) => {
  res.render('about', {
    fortune: fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js'
  })
})
app.get('/tours/hood-river', (req, res) => {
  res.render('tours/hood-river')
})
app.get('/tours/request-group-rate', (req, res) => {
  res.render('tours/request-group-rate')
})
app.use((req, res) => {
  res.status(404)
  res.render('404')
})
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500)
  res.render('500')
})

app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost:' + app.get('port'))
})