const express = require('express');

const router = express.Router();

router.get('/add-product',(req, res, next) => {   // 请求处理器函数
  res.send('<form action="/product" method="POST"><input type="text" name="title"/><button type="submit">添加产品</button></form>');
});

router.post('/product', (req, res) => {
  console.log(req.body);
  res.redirect('/') // express 框架提供的
});

module.exports = router;
