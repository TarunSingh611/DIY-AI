// components/ErrorBoundary.js
'use client';
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state to render fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error information here
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this?.state?.hasError) {
      return (
        <div className="bg-red-100 text-red-800 p-4 rounded-md">
          <h1 className="text-2xl font-bold">Something went wrong.</h1>
          <p>We encountered an issue and couldn't process your request. Please try again later.</p>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
