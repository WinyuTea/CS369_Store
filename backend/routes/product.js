var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product')

//get all product
router.get('/', async function(req, res, next) {
    try {
        const products = await Product.find();
        console.log(products);
        res.json(products);
    } catch (err) {
        next(err); // Pass error to the error handling middleware
    }
});

//add product
router.post('/', async (req, res, next) => {
    try {
        const savedProduct = await Product.create(req.body);
        res.status(201).json(savedProduct);
    } catch (err) {
        next(err);
    }
});

module.exports = router;