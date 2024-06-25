const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the User model
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Use JSON parser
app.use(express.json());

// Register a new user
app.post('/user/register', (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save((err, user) => {
    if (err) {
      res.status(400).json({ error: 'Failed' });
    } else {
      res.json({ message: '' });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});