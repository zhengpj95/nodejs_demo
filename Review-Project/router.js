
const express = require('./node_modules/express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.html', {
    username: '五月之约',
    date: new Date()
  })
})

router.get('/index', (req, res) => {
  res.render('index.html', {
    username: '五月之约',
    date: new Date()
  })
})

module.exports = router;