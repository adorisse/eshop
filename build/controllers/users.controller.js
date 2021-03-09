"use strict";

var User = require('../models/user.model');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var _require = require('joi'),
    required = _require.required; //


exports.bidule = function (req, res) {
  var hachePWD = bcrypt.hashSync(req.body.password, 10);
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hachePWD
  });
  user.save().then(function (data) {
    var userToken = jwt.sign({
      id: data._id
    }, 'supersecret', {
      expiresIn: 86400
    });
    res.send({
      //user: data,
      //created: true
      token: userToken,
      auth: true
    });
  })["catch"](function (err) {
    console.log(err.message);
    res.status(500).send({
      error: 500,
      message: err.message || "some error occured while creating user"
    });
  });
};

exports.findOne = function (req, res) {
  User.findById(req.params.id).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    return res.send(err);
  });
}; //


exports.login = function (req, res) {
  User.findOne({
    email: req.body.email
  }).then(function (user) {
    if (!user) {
      return res.status(404).send({
        auth: false,
        token: null,
        message: "No user find with email $(req.body.email)"
      });
    }

    var pwdIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!pwdIsValid) {
      return res.status(401).send({
        auth: false,
        token: null,
        message: "password is not valid"
      });
    }

    var userToken = jwt.sign({
      id: user._id
    }, "supersecret", {
      expiresIn: 86400
    });
    res.send({
      auth: true,
      token: userToken
    });
  })["catch"](function (err) {
    res.send(err);
  });
};