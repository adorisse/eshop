const express = require('express');
const router = express.Router();
const product = require('../controllers/product.controller');

router.post('/products', product.create);
router.get('/products/', product.getProducts);

router.get('/products/:id', product.getProduct);


module.exports = router;