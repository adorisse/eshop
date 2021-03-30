const express = require('express');
const router = express.Router();
const product = require('../controllers/product.controller');
const productSchemaValidation = require('../middlewares/product.validation');

//route Admin
router.post('/products', product.create);
//router.patch('/products/:id', productSchemaValidation, product.update);
router.delete('/products/:id', product.delete)
// route user lamda
router.get('/products/', product.getProducts);
router.get('/products/:id', product.getProduct);

module.exports = router;