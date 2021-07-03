const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
)

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // 1. 获取之前的购物车
    fs.readFile(p, (err, fileContent) => {
      let cart = {
        products: [],
        totalPrice: 0
      };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // 2. 分析购物车 -> 找到已存在的产品
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updateProduct;
      // 3. 添加产品 / 增加产品相对应的数量
      if (existingProduct) {
        updateProduct = { ...existingProduct };
        updateProduct.quantity = updateProduct.quantity + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updateProduct;
      } else {
        updateProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updateProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      })
    })
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = {...JSON.parse(fileContent)};
      const product = updatedCart.products.find(prod => prod.id === id);
      const productQuantity = product.quantity;
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQuantity;

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      })
    })
  }
}