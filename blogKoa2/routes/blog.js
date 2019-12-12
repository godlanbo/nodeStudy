const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  const query = ctx.query
  ctx.body = {
    data: 'lsit',
    error: 0,
    query
  }
})


module.exports = router
