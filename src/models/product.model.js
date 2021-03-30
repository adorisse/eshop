const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    price: Number,
    description: String,
    imgUrl: String,
    category: String
})

module.exports = mongoose.model('Product', productSchema);