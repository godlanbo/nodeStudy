const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  const data = await login(username, password)
  if (data.username) {
    // 设置 req 中的 session
    ctx.session.username = data.username
    ctx.session.realname = data.realname
    ctx.body = new SuccessModel(data.realname)
  } else {
    ctx.body = new ErrorModel('登陆失败')
  }
})
// session 测试
// router.get('/session-test', async (ctx, next) => {
//   if (ctx.session.v == null) {
//     ctx.session.v = 0
//   }
//   ctx.session.v ++
//   ctx.body = {
//     v: ctx.session.v
//   }
// })

module.exports = router
