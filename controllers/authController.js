const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateAuthToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expiration time
  });
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = await User.create({ name, email, password: hashedPassword, role });
    const token = generateAuthToken(user); // Generate token for the newly registered user
    res.status(201).json({ user, token }); // Return user info along with the token
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = generateAuthToken(user); // Generate token for the authenticated user
    res.json({ token, user }); // Return user info along with the token
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
