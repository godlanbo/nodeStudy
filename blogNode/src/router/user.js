const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')
// 设置cookie的过期时间
// const getCookieExpires = () => {
//   const d = new Date()
//   d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
//   return d.toGMTString()
// }

const handleUserRouter = (req, res) => {
  const method = req.method
  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    // const { username, password } = req.query
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        // 设置 req 中的 session
        req.session.username = data.username
        req.session.realname = data.realname
        // 将 session 放入redis中
        set(req.sessionId, req.session)
        return new SuccessModel(data.realname)
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }
  // login测试接口
  // if (method === 'GET' && req.path === '/api/user/login-test') {
  //   if (req.session.username) {
  //     return Promise.resolve(new SuccessModel({
  //       session: req.session
  //     }))
  //   } else {
  //     return Promise.resolve(new ErrorModel('尚未登录'))
  //   }
  // }
}

module.exports = handleUserRouter