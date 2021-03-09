"use strict";

var Product = require('../models/product.model'); //


exports.create = function (req, res) {
  var product = new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imgUrl: req.body.imgUrl
  });
  product.save().then(function (data) {
    res.send({
      //user: data,
      //created: true
      //token:userToken,
      product: data
    });
  })["catch"](function (err) {
    console.log(err.message);
    res.status(500).send({
      error: 500,
      message: err.message || "some error occured while creating user"
    });
  });
};

exports.getProduct = function (req, res) {
  Product.findById(req.params.id).then(function (data) {
    if (!data) {
      res.status(404).send({
        message: "Product with id $(req.params.id) not found"
      });
    }

    res.send(data);
  })["catch"](function (err) {
    return res.send(err);
  });
};

exports.getProducts = function (req, res) {
  Product.find().then(function (data) {
    if (!data) {
      res.status(404).send({
        message: "Product with id $(req.params.id) not found"
      });
    }

    res.send(data);
  })["catch"](function (err) {
    return res.send(err);
  });
};