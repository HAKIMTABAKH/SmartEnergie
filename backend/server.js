require('dotenv').config(); // To load environment variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import the SensorData model (ensure this file exists and is correctly implemented)
const SensorData = require('./src/models/SensorData');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/energyDB', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Root route for the API
app.get('/', (req, res) => {
  res.send('Welcome to the EnergiFlow API!');
});

// POST route to handle incoming sensor data
app.post('/api/sensor-data', async (req, res) => {
  try {
    const { voltage, current, temperature, humidity, light, timestamp } = req.body;

    // Validate input
    if (voltage === undefined || current === undefined || temperature === undefined || 
        humidity === undefined || light === undefined || timestamp === undefined) {
      return res.status(400).send('Invalid data format. Please provide voltage, current, temperature, humidity, light, and timestamp.');
    }

    // Create a new sensor data entry
    const newSensorData = new SensorData({
      voltage: parseFloat(voltage),
      current: parseFloat(current),
      temperature: parseFloat(temperature),
      humidity: parseFloat(humidity),
      light: parseFloat(light),
      timestamp: new Date(timestamp), // Ensure timestamp is a Date object
    });

    // Save the data to MongoDB
    await newSensorData.save();
    res.status(201).send('Data saved to MongoDB');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data: ' + error.message);
  }
});

// GET route to fetch recent sensor data
app.get('/api/sensor-data', async (req, res) => {
  try {
    const data = await SensorData.find().sort({ timestamp: -1 }).limit(10);
    res.json(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
