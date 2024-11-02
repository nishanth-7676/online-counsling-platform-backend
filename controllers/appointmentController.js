const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
  const { counselorId, date, time } = req.body;
  const clientId = req.user.id; // Assuming you're using JWT to get user info

  try {
    const appointment = await Appointment.create({ counselorId, clientId, date, time });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
