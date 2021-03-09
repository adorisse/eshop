const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    total: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }]

})

module.exports = mongoose.model('order', orderSchema);