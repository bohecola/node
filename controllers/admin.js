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
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
    userId: req.user.id
  })
  .then(result => {
    // console.log(result);
    console.log('产品添加成功！');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; // true
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user.getProducts({ where: {id: prodId} }).then(products => {
    const product = products[0];
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', { // 渲染视图文件
      pageTitle: '添加产品',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }).catch(err => console.log(err));

  // Product.findByPk(prodId).then(product => {
  //   if (!product) {
  //     return res.redirect('/')
  //   }
  //   res.render('admin/edit-product', { // 渲染视图文件
  //     pageTitle: '添加产品',
  //     path: '/admin/edit-product',
  //     editing: editMode,
  //     product: product
  //   });
  // }).catch(err => console.log(err));
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId).then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDesc;
    return product.save();
  })
  .then(result => {
    console.log('更新产品成功');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
}; 

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: '管理商品',
        path: '/admin/products'
      })
    }).catch(err => console.log(err))
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId).then(product => {
    return product.destroy();
  }).then(result => {
    console.log('删除产品成功');
    res.redirect('/admin/products');
  }).catch(err => console.log(err))
};