"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var productSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  imgUrl: String
});
module.exports = mongoose.model('product', productSchema);