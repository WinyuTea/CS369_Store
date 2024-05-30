const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const productRouter = require('./routes/product');
const authRouter = require('./routes/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static images from the public/Images directory
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Define routes
app.use('/product', productRouter);
app.use('/auth', authRouter);

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imagePath = `/images/${req.file.filename}`;
  res.json({ path: imagePath });
});

app.use(function (req, res, next) {
  next(createError(404));
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
