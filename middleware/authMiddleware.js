const jwt = require('jsonwebtoken');

// Middleware to authenticate the user
exports.authenticate = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1]; // Assumes "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret from .env
    req.user = decoded; // Attach the decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
