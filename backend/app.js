var express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const config = require('./dbconfig');

var productRouter = require('./routes/product');
var authRouter = require('./routes/auth');

var app = express();
app.use(bodyParser.json());

app.use('/product', productRouter);
app.use('/auth', authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
