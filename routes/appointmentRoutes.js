const express = require('express');
const { bookAppointment } = require('../controllers/appointmentController');
const { authenticate } = require('../middleware/authMiddleware'); // Assuming you have an authentication middleware
const { register } = require('../controllers/authController');

const router = express.Router();

router.post('/', authenticate, bookAppointment); // Protect the route with authentication
router.post('/register', register);
module.exports = router;
