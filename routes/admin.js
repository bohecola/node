const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// /admin/add-product
router.get('/add-product', productsController.getAddProduct);

// /admin/product
router.post('/product', productsController.postAddProduct);

module.exports = router;