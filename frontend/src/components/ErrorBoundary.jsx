import React from 'react';
import { ErrorContainer } from '@/components/export.js';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    } else {
      window.location.reload();
    }
  };

  handleBack = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onBack) {
      this.props.onBack();
    } else {
      window.history.back();
    }
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-slate-50/50 backdrop-blur-sm z-[9999] overflow-hidden p-4 md:p-6">
          <ErrorContainer error={this.state.error?.message || 'An unexpected application error occurred.'} onRetry={this.handleRetry} onBack={this.handleBack} errorAdditionalHelp={['The application encountered a runtime error.', 'Try refreshing the page or going back to the previous screen.', 'If the problem persists, please contact support with the error details.']} />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
