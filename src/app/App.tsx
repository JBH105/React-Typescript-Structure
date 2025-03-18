import { ErrorFallbackComponent } from '@core/error/components/error-fallback.component';
import { sendErrorToApi } from '@core/error/services/error.service';
import LoggerProvider from '@core/logger/context/logger.context';
import logger from '@core/logger/logger';
import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const moduleName = 'AppComponent';

const AppComponent: React.FC = () => {
  useEffect(() => {
    logger.info('Component mounted', moduleName);
  }, []);

  return (
    <div>
      Welcome to the PastPaper Library
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent} onError={sendErrorToApi}>
      <LoggerProvider>
        <AppComponent />
      </LoggerProvider>
    </ErrorBoundary>
  );
};

export default App;
