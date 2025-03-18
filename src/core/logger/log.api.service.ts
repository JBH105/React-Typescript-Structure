import { config } from '@config/config';
import axios from 'axios';

// API endpoint to send log messages

// Custom method to log messages to the API endpoint
export const logToApi = async (message: string) => {
  const API_ENDPOINT = config.API_TMSBASE_URL;
  const errorMessage = 'Error sending log message to API:';
  const data = { message: message, errorMessage };
  return await axios.post(`${API_ENDPOINT}/logs`, data);
};
