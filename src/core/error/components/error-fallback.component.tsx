import { IErrorFallbackProps } from '@core/error/interfaces/IErrorFallbackProps';
import React from 'react';

export const ErrorFallbackComponent: React.FC<IErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <h2>Something went wrong:</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
