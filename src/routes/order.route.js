const express = require('express');
const router = express.Router();
const order = require('../controllers/order.controller');

router.post('/orders', order.create);
router.get('/orders/', order.getOrders);

router.get('/products/:id', order.getOrder);


module.exports = router;