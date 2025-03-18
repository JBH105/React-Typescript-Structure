import { IErrorBoundaryProps, IErrorBoundaryState } from '@core/error/interfaces/IErrorFallbackProps';
import { sendErrorToApi } from '@core/error/services/error.service';
import React, { ErrorInfo } from 'react';

import { ErrorFallbackComponent } from './error-fallback.component';

class ErrorBoundaryComponent extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  state: IErrorBoundaryState = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    sendErrorToApi(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return <ErrorFallbackComponent error={error as Error} resetErrorBoundary={this.handleReset} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundaryComponent;
