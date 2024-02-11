// server/server.js
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const { Schema, model } = mongoose;

// Add the declaration for Express Request module
express.request.user = {};

dotenv.config();

// console.log("Attempting to connect to DB");

mongoose.connect('mongodb://localhost:27017/uploadthing', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const UserSchema = new Schema({
  email: String,
  password: String,
  profilePicture: String,
});

const User = model('User', UserSchema);

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());

  // JWT Secret Key
  const secretKey = 'test141';

  // Middleware to verify JWT token
  const authenticateJWT = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
      req.user = user;
      next();
    });
  };  

  server.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: 'User registered successfully' });
  });

  server.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  });

  server.get('/api/profile', authenticateJWT, (req, res) => {
    // Access user information through req.user
    res.json({ email: req.user.email, profilePicture: req.user.profilePicture });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
  });
});
