const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

const products = [];

// /admin/add-product
router.get('/add-product',(req, res, next) => {   // 请求处理器函数
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.render('add-product', {pageTitle: '添加产品', path: '/admin/add-product'})
});

// /admin/product
router.post('/product', (req, res) => {
  products.push({ title: req.body.title })
  res.redirect('/') // express 框架提供的
});

exports.routes = router;
exports.products = products;
