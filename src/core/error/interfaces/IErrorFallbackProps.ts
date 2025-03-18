import { ReactNode } from 'react';

export interface IErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export interface IErrorBoundaryProps {
  children: ReactNode; 
}

export interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
