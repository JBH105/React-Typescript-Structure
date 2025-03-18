import logger from 'loglevel';
//import { logToApi } from './log.api.service';

// Set log level
logger.setLevel('info');

// Override the default log methods to include file logging
const originalFactory = logger.methodFactory;
logger.methodFactory = (methodName, logLevel, loggerName) => {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);
  return (message: string) => {
    rawMethod(message);
    // logToApi(message);
  };
};

// Enable trace method for completeness
logger.trace = logger.debug;

export default logger;
