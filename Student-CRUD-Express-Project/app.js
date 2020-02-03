/**
 * 入口文件
 */

const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 5000
// 引入Nodejs自带的child_process模块
// 用以使用默认浏览器打开地址
const childProcess = require('child_process');

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.engine('html', require('express-art-template'))
// 配置 body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(router)

// 统一处理错误请求
app.use( (req, res, next) => {
  res.render('404.html')
})

app.listen(port, () => {
  console.log(`server runs on http://localhost:${port}`);

  // 使用默认浏览器打开地址
  childProcess.exec(`start http://localhost:${port}`);
})


