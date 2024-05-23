const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    prod_name: String,
    prod_image_path: String,
    prod_price: Number,
    prod_desc: String
})

module.exports = mongoose.model('product', productSchema)
