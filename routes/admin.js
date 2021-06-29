const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

const products = [];

// /admin/add-product
router.get('/add-product',(req, res, next) => {   // 请求处理器函数
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.render('add-product', {
    pageTitle: '添加产品',
    path: '/admin/add-product',
    productCSS: true,
    // layout: false // 不使用app.js中expressHbs()指定的默认layout
    isAddProductActive: true
  }) // 渲染视图文件
});

// /admin/product
router.post('/product', (req, res) => {
  products.push({ title: req.body.title }) // 接收到请求的数据，并push到products数组当中
  res.redirect('/') // express 框架提供的
});

exports.routes = router;
exports.products = products; // 导出数据 products
