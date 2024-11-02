const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  counselorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // To link to the client who booked
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
