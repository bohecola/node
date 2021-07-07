const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {   // 请求处理器函数
  res.render('admin/edit-product', { // 渲染视图文件
    pageTitle: '添加产品',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  });
  product
    .save()
    .then(result => {
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
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/')
      }
      res.render('admin/edit-product', { // 渲染视图文件
        pageTitle: '编辑产品',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    }).catch(err => console.log(err));
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save()
    })
    .then(result => {
      console.log('更新产品成功');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}; 

exports.getProducts = (req, res, next) => {
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      console.log(products);
      res.render('admin/products', {
        prods: products,
        pageTitle: '管理商品',
        path: '/admin/products'
      })
    }).catch(err => console.log(err))
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(result => {
      console.log('删除产品成功');
      res.redirect('/admin/products');
    }).catch(err => console.log(err))
};