const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {   // 请求处理器函数
  res.render('admin/add-product', { // 渲染视图文件
    pageTitle: '添加产品',
    path: '/admin/add-product'
  })
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, price, description);
  product.save()
  res.redirect('/') // express 框架提供的
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => 
    res.render('admin/products', {
      prods: products,
      pageTitle: '管理商品',
      path: '/admin/products'
    }) 
  );
};