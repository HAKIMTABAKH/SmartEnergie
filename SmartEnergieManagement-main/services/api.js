import axios from 'axios';

// Fetch energy data for a specific period (e.g., month, week, etc.)
export const fetchEnergyData = async (period) => {
  try {
    const response = await axios.get(`http://192.168.35.222:5001/api/statistics/bar?period=${period}`);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching energy data:", error);
    throw error; // Rethrow the error to be caught in the calling function
  }
};


// Fetch prediction result from the backend
export const fetchPrediction = async (formData) => {
  try {
    const response = await axios.post('http://192.168.35.222:5001/predict', formData);
    return response.data.prediction; // Return prediction value
  } catch (error) {
    console.error('Error fetching prediction:', error);
    throw error;
  }
};
