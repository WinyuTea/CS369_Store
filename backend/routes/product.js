const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const config = require('../dbconfig');

// Function to get products from the database
async function getProducts() {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT productID, productName, productPrice, productDescription, productImage FROM product`;
        return result.recordset;
    } catch (err) {
        console.error('SQL error', err);
        throw err;
    } finally {
        await sql.close();
    }
}

// Function to add products from the database
async function addProduct(productName, productPrice, productDescription, productImage) {
    try {
      // Connect to the database
      let pool = await sql.connect(config);
  
      // SQL query to insert a new product
      const insertQuery = `
        INSERT INTO Product (productName, productPrice, productDescription, productImage)
        VALUES (@productName, @productPrice, @productDescription, @productImage);
      `;
  
      // Execute the query
      await pool.request()
        .input('productName', sql.NVarChar(100), productName)
        .input('productPrice', sql.Decimal(10, 2), productPrice)
        .input('productDescription', sql.NVarChar(255), productDescription)
        .input('productImage', sql.NVarChar(sql.MAX), productImage)
        .query(insertQuery);
  
      console.log("Product added successfully!");
  
      // Close the connection
      pool.close();
    } catch (err) {
        console.error("Error adding product:", err);
    }
  }

// router for get all product
router.get('/', async (req, res) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/', passport.authenticate('jwt', { session: false }), [
    // Validation middleware
    body('productName').notEmpty().withMessage('Product name is required'),
    body('productPrice').notEmpty().isNumeric().withMessage('Product price must be a number'),
    body('productDescription').notEmpty().withMessage('Product description is required')
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { productName, productPrice, productDescription, productImage } = req.body;
    try {
        await addProduct(productName, productPrice, productDescription, productImage);
        res.status(200).send('Product added successfully!');
    } catch (err) {
        res.status(500).send('Error adding product: ' + err.message);
    }
});

module.exports = router;