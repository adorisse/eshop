"use strict";

var express = require('express');

var router = express.Router();

var order = require('../controllers/order.controller');

router.post('/orders', order.create);
router.get('/orders/', order.getOrders);
router.get('/products/:id', order.getOrder);
module.exports = router;