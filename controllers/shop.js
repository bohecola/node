const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: '商店',
      path: '/'
    });
  }).catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: '所有商品',
      path: '/products'
    });
  }).catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({
  //   where: {
  //     id: prodId
  //   }
  // }).then(products => {
  //   res.render('shop/product-detail', {
  //     product: products[0],
  //     pageTitle: products[0].title,
  //     path: '/products'
  //   })
  // }).catch(err => console.log(err));
  Product.findById(prodId)
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      })
    })
    .catch(err => console.log(err))
}

// exports.getCart = (req, res, next) => {
//   req.user.getCart().then(cart => {
//     return cart.getProducts().then(products => {
//       res.render('shop/cart', {
//         path: '/cart',
//         pageTitle: '我的购物车',
//         products: products
//       }) 
//     }).catch(err => console.log(err));
//   }).catch(err => console.log(err));
// };

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   let fetchedCart;
//   let newQuantity = 1;
//   req.user
//     .getCart()
//     .then(cart => {
//       fetchedCart = cart;
//       return cart.getProducts({ where: {id: prodId} })
//     })
//     .then(products => {
//       let product;
//       if (products.length > 0) {
//         product = products[0];
//       }
//       if (product) {
//         const oldQuantity = product.cartItem.quantity;
//         newQuantity = oldQuantity + 1;
//         return product;
//       }
//       return Product.findByPk(prodId)
//     })
//     .then(product => {
//       fetchedCart.addProduct(product, { through: { quantity: newQuantity } })
//     })
//     .then(() => {
//       res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// }

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   req.user.getCart()
//     .then(cart => {
//       return cart.getProducts({ where: {id: prodId} })
//     })
//     .then(products => {
//       const product = products[0];
//       return product.cartItem.destroy();
//     })
//     .then(result => {
//       res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// }

// exports.postOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then(cart => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then(products => {
//       return req.user
//         .createOrder().then(order => {
//           order.addProducts(products.map(product => {
//             product.orderItem = { quantity: product.cartItem.quantity }
//             return product;
//           }))
//         }).catch(err => console.log(err));
//     })
//     .then(result => {
//       fetchedCart.setProducts(null);
//     })
//     .then(result => {
//       res.redirect('/orders')
//     })
//     .catch(err => console.log(err))
// }

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders({include: ['products']})
//     .then(orders => {
//       console.log(orders);
//       res.render('shop/orders', {
//         path: '/orders',
//         pageTitle: '我的订单',
//         orders: orders
//       }) 
//     }).catch(err => console.log(err));
// };
