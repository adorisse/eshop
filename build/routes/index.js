"use strict";

var express = require('express');

var router = express.Router();

var userRouter = require('./users.route');

var orderRouter = require('./order.route');

var productRouter = require('./products.route');

router.use(userRouter);
router.use(productRouter);
router.use(orderRouter);
module.exports = router;