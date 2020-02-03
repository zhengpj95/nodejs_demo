/**
 * 路由文件
 */

const express = require('express')
const router = express.Router()
const Student = require('./models/student')

// 首页展示
router.get('/', (req, res, next) => {
  Student.find( (err, students) => {
    if (err) {
      return res.status(500).send('Server error...')
    }
    res.render('index.html', {
      students: students
    })
  })
})

// 页面跳转
router.get('/students/new', (req, res, next) => {
  res.render('topic/new.html')
})

// 添加
router.post('/students/new', (req, res, next) => {
  new Student(req.body).save( (err, ret) => {
    if (err) {
      return res.status(500).send('Server error...')
    }
    res.redirect('/')
  })
})

// 页面跳转到编辑页面
router.get('/students/edit', (req, res, next) => {
  var id = req.query.id.replace(/"/g,'')
  Student.findById(id, (err, student) => {
    if (err) {
      return res.status(500).send('Server error...')
    }
    res.render('topic/edit.html', {
      student: student
    })
  })
})

// 编辑
router.post('/students/edit', (req, res, next) => {
  var id = req.body.id.replace(/"/g, '')
  Student.findByIdAndUpdate(id, req.body, (err, ret) => {
    if (err) {
      return res.status(500).send('Server error...')
    }
    res.redirect('/')
  })
})

// 删除
router.get('/students/delete', (req, res, next) => {
  var id = req.query.id.replace(/"/g, '')
  Student.findByIdAndDelete(id, (err, ret) => {
    if (err) {
      return res.status(500).send('Server error...')
    }
    res.redirect('/')
  })
})

module.exports = router