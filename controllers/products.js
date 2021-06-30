const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {   // 请求处理器函数
  res.render('add-product', { // 渲染视图文件
    pageTitle: '添加产品',
    path: '/admin/add-product',
    productCSS: true,
    // layout: false // 不使用app.js中expressHbs()指定的默认layout
    isAddProductActive: true
  })
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save()
  res.redirect('/') // express 框架提供的
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => 
    res.render('shop', {
      prods: products,
      pageTitle: '我的商店',
      path: '/',
      hasProducts: products.length > 0,
      formsCSS: true,
      productCSS: true,
      isShopActive: true
    }) 
  );
};