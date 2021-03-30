const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    lastName: {
        type: String,
        lowercase: true,
        trim: true
    },
    firstName: {
        type: String,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: 'false'
    },
    country: {
        type: String,
        uppercase: true,
    },

    city: {
        type: String,
        lowercase: true,
    },
    StreetNumber: {
        type: Number,
    },
    StreetName: {
        type: String,
    },
    zipCode: {
        type: Number,
    },

})

module.exports = mongoose.model('User', userSchema);