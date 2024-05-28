var express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
var cors = require('cors');

var productRouter = require('./routes/product');
var authRouter = require('./routes/auth');

var app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static images from the public/Images directory
app.use('/images', express.static(path.join(__dirname, 'public', 'Images')));

// Define routes
app.use('/product', productRouter);
app.use('/auth', authRouter);

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/Images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({storage: storage});

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Correct image path
  const imagePath = `../images/${req.file.filename}`;
  res.json({ path: imagePath });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
