const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {   // 请求处理器函数
  res.render('admin/edit-product', { // 渲染视图文件
    pageTitle: '添加产品',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, price, description);
  product.save()
  res.redirect('/') // express 框架提供的
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; // true
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', { // 渲染视图文件
      pageTitle: '添加产品',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => 
    res.render('admin/products', {
      prods: products,
      pageTitle: '管理商品',
      path: '/admin/products'
    })
  );
};