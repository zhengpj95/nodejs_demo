
const express = require('express')
const Root = require('./models/root')
const md5 = require('blueimp-md5')  // 密码加密
const router = express.Router()     // 创建路由

router.get('/', (req, res) => {
  Root.find(function (err, roots) {
    if (err) {
      return console.log('find error')
    }
    res.render('home.html', {
      roots: roots,
      sessionRoot: req.session.root
    })
  })
})

router.get('/login', (req, res) => {
  res.render('login.html')
})
router.post('/login', (req, res) => {
  var body = req.body
  Root.findOne({
    username: body.username,
    password: md5(md5(body.password))
  }, function (err, root) {
    if (err) {
      return res.status(500).json({
        err_code: 500 // server error
      })
    }
    if (!root) {
      return res.status(200).json({
        err_code: 1 // username or password is invalid.
      })
    }
    // 保存到session
    req.session.root = root
    res.status(200).json({
      err_code: 0,  // login successful
      root: root
    })
  })
})

router.get('/register', (req, res) => {
  res.render('register.html')
})
router.post('/register', (req, res) => {
  var body = req.body
  /**
   * 先查询此用户名是否可用
   * 
   * 可用就写入
   */
  Root.findOne({
    username: body.username
  }, function (err, data) {
    if (err) {
      // server error
      return res.status(500).json({
        err_code: 500 // 服务器错误
      })
    }
    if (data) {
      // username has alread exists.
      return res.status(200).json({
        isExist: true // 用户已存在
      })
    }

    body.password = md5(md5(body.password))
    new Root(body).save(function (err, root) {
      if (err) {
        return res.status(500).json({
          err_code: 1 // 插入错误
        })
      }
      // 保存到session
      req.session.root = root
      res.status(200).json({
        err_code: 0 //插入成功
      })
    })
  })
})

router.get('/delete', (req, res) => {
  var rid = req.query.rid
  Root.deleteOne({
    _id: rid    // mongodb中的id为_id
  }, (err) => {
    if (err) {
      return res.status(500).json({
        success: false
      })
    }
    return res.status(200).json({
      success: true
    })
  })
})

module.exports = router
