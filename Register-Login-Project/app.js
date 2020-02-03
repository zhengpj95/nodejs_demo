
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')   // 获取表单 POST 提交的数据
const router = require('./router')
const session = require('express-session')
const app = express()
const port = 3000

// 开发静态资源
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
app.use('/public/', express.static(path.join(__dirname, './public/')))
// 配置模板引擎
app.engine('html', require('express-art-template'))
// 配置获取表单 POST 提交的数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
  // 目的是为了增加安全性，防止客户端恶意伪造
  secret: 'mytest',
  resave: false,
  saveUninitialized: true // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))

// 几乎所有的配置都要在此之前
app.use(router)

// 统一处理 404 
app.use(function (req, res) {
  res.status(404).render("404.html")
})

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
})
