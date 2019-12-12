var express = require('express');
var router = express.Router();
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  // const { username, password } = req.query
  const result = login(username, password)
  return result.then(data => {
    if (data.username) {
      // 设置 req 中的 session
      req.session.username = data.username
      req.session.realname = data.realname
      res.json(new SuccessModel(data.realname))
      return
    } else {
      res.json(new ErrorModel('登陆失败'))
    }
  })
});



module.exports = router;
