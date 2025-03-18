import React, { createContext } from 'react';

import logger from '../logger';

export const LoggerContext = createContext(logger);

interface LoggerProviderProps {
  children?: React.ReactNode;
}

const LoggerProvider: React.FC<LoggerProviderProps> = ({ children }) => {
  return <LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>;
};

export default LoggerProvider;
