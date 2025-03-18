import { config } from '@config/config';
import logger from '@core/logger/logger';
import axios from 'axios';
import { ErrorInfo } from 'react';

// API endpoint to send log messages
const API_ENDPOINT = config.API_TMSBASE_URL;

// Error logging function
export async function sendErrorToApi(error: Error, errorInfo: ErrorInfo) {
  // Simulate an error
  // const throwError = () => {
  //   throw new Error('Example error');
  // };
  // throwError();
  // Use your preferred error logging service
  logger.error('Caught an error:', error, errorInfo);
  const errorMessage = 'Failed to send error to API';

  const requestBody = {
    error: error.toString(),
    errorInfo: errorInfo.componentStack,
    errorMessage
  };

  return await axios.post(`${API_ENDPOINT}/error`, requestBody);
}
