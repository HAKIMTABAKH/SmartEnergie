const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  voltage: { type: Number, required: true },
  current: { type: Number, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  light: { type: Number, required: true },
  timestamp: { type: Date, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('SensorData', sensorDataSchema);
