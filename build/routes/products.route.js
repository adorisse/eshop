"use strict";

var express = require('express');

var router = express.Router();

var product = require('../controllers/Product.controller');

router.post('/products', product.create);
router.get('/products/', product.getProducts);
router.get('/products/:id', product.getProduct);
module.exports = router;