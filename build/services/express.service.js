"use strict";

require('dotenv').config();

var express = require('express');

var app = express();

var apiRouter = require('../routes');

var bodyParser = require('body-parser');

var cors = require('cors');

exports.start = function () {
  var port = process.env.PORT;
  app.use(bodyParser.json());
  app.use(cors());
  app.use('/api/v1', apiRouter);
  app.listen(port, function (err) {
    if (err) {
      console.log("Error : ".concat(err));
      process.exit();
    }

    console.log("app is running on port ".concat(port));
  });
};