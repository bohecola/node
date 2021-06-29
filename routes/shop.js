const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');
const adminData = require('./admin'); // 引入数据文件

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = adminData.products
  // res.sendFile(path.join(rootDir,'views', 'shop.html'));
  res.render('shop', {
    prods: products,
    pageTitle: '我的商店',
    path: '/',
    hasProducts: products.length > 0,
    formsCSS: true,
    productCSS: true,
    isShopActive: true
  }); // 渲染视图文件
});

module.exports = router;