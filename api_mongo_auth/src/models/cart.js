const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        min: 6,
    },
    product_name: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    price: {
        type: Float32Array,
        required: true,
        default: 0.00
    },
    count: {
        type: Int32Array,
        required: true,
        default: 1
    }
});

module.exports = mongoose.model('Cart', cartSchema);