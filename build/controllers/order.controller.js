"use strict";

var Order = require('../models/order.model'); //


exports.create = function (req, res) {
  var order = new Order({
    total: req.body.total,
    user: req.body.user,
    products: req.body.products
  });
  order.save().then(function (data) {
    res.send({
      order: data
    });
  })["catch"](function (err) {
    console.log(err.message);
    res.status(500).send({
      error: 500,
      message: err.message || "some error occured while creating order"
    });
  });
};

exports.getOrder = function (req, res) {
  Order.findById(req.params.id).populate('products').populate('user').then(function (data) {
    res.send({
      order: data,
      created: true
    });
  })["catch"](function (err) {
    return res.send(err);
  });
};

exports.getOrders = function (req, res) {
  Order.find().then(function (data) {
    if (!data) {
      res.status(404).send({
        message: "Order with id $(req.params.id) not found"
      });
    }

    res.send(data);
  })["catch"](function (err) {
    return res.send(err);
  });
};