var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const product = require('../models/productModel')

//get all product
router.get('/', function(req, res, next) {
    product.find((err, products) => {
        if(err) return next(err);
        console.log(products);
        res.json(products);
    })
});

//add product
router.post('/', async (req, res, next) => {
    try {
        const newProduct = new product({
            prod_name: req.body.name,
            prod_image_path: req.body.image_path,
            prod_price: req.body.price,
            prod_desc: req.body.description
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
        console.log('good')
    } catch (err) {
        console.log('555error')
        next(err);
    }
});

module.exports = router;