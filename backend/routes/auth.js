const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { body, validationResult } = require('express-validator');
const sql = require('mssql');
const config = require('../dbconfig');

const router = express.Router();

// Configure the local strategy
passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('username', sql.NVarChar(255), username)
        .query('SELECT * FROM [User] WHERE username = @username');
      const user = result.recordset[0];
      pool.close();

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Configure the JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'jwtSecret',
};

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id', sql.Int, jwtPayload.id)
      .query('SELECT * FROM [User] WHERE userID = @id');
    const user = result.recordset[0];
    pool.close();

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

router.use(passport.initialize());

router.post('/login', [
  body('username', 'Username is required').not().isEmpty(),
  body('password', 'Password is required').exists()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ msg: info.message });
    }

    const payload = { id: user.userID, username: user.username };
    jwt.sign(payload, process.env.JWT_SECRET || 'jwtSecret', { expiresIn: '1h' }, (err, token) => {
      if (err) {
        return next(err);
      }
      res.json({ token });
    });
  })(req, res, next);
});

router.post('/signup', [
  body('username', 'Username is required').not().isEmpty(),
  body('password', 'Password is required').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('username', sql.NVarChar(255), username)
      .query('SELECT * FROM [User] WHERE username = @username');

    if (result.recordset.length > 0) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.request()
      .input('username', sql.NVarChar(255), username)
      .input('password', sql.NVarChar(255), hashedPassword)
      .query('INSERT INTO [User] (username, password) VALUES (@username, @password)');

    pool.close();

    res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/data', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ msg: 'Protected data access granted', user: req.user });
});

module.exports = router;

