const Product = require('../models/product')

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => 
    res.render('shop/index', {
      prods: products,
      path: '/',
      pageTitle: '商店'
    }) 
  );
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => 
    res.render('shop/product-list', {
      prods: products,
      pageTitle: '所有商品',
      path: '/products'
    }) 
  );
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: '我的购物车'
  }) 
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: '我的订单'
  }) 
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: '结算页面'
  }) 
};