const router = require('koa-router')()
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''

  //确保访问操作页面的时候只显示自己的博客内容
  if (ctx.query.isadmin) {
    if (ctx.session.username == null) {
      ctx.body = new ErrorModel('尚未登录')
      return
    }
    // 强制将搜索作者改为登录用户
    author = ctx.session.username
  }

  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData)

  // const result =  getList(author, keyword)
  // return result.then(listData => {
  //   res.json(new SuccessModel(listData))
  // })
})

router.get('/detail', async (ctx, next) => {
  const data = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(data)
  // const result = getDetail(ctx.query.id)
  // return result.then(data => {
  //   res.json(new SuccessModel(data))
  // })
})

router.post('/new', loginCheck, async (ctx, next) => {
  ctx.request.body.author = ctx.session.username
  const data = await newBlog(ctx.request.body)
  ctx.body = new SuccessModel(data)
  // return result.then(data => {
  //   res.json(new SuccessModel(data))
  // })
})

router.post('/update', loginCheck, async (ctx, next) => {
  const val = await updateBlog(ctx.query.id, ctx.request.body)
  ctx.body = val ? new SuccessModel() : new ErrorModel('更新失败')
  // return result.then(val => {
  //   if (val) {
  //     res.json(new SuccessModel())
  //   } else {
  //     res.json(new ErrorModel('更新失败'))
  //   }
  // })
})

router.post('/del', loginCheck, async (ctx, next) => {
  const author = ctx.session.username
  const val = await delBlog(req.query.id, author)
  ctx.body = val ? new SuccessModel() : new ErrorModel('删除失败')
  // return result.then(val => {
  //   if (val) {
  //     res.json(new SuccessModel())
  //   } else {
  //     res.json(new ErrorModel('删除失败'))
  //   }
  // })
})


module.exports = router
