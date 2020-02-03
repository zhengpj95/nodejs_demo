
const express = require('./node_modules/express');
const path = require('path');
const router = require('./router')
const app = express();
const localhost = '127.0.0.1';
const port = '3000';

app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')));
app.use('/public', express.static(path.join(__dirname, './public/')));

app.engine('html', require('./node_modules/express-art-template/src'));

app.use(router);

app.use(function (req, res) {
  res.status(400).render('404.html', {
    title : "404, not found."
  });
});

app.listen(port, () => {
  console.log(`server running at http://${localhost}:${port}`);
});