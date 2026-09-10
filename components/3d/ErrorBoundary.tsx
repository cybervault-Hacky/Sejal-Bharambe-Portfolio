"use client";

import * as React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error but don't expose stack to user
    console.warn("3D ErrorBoundary caught:", error.message);
    this.props.onError?.(error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center rounded-[var(--radius-2xl)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/40 backdrop-blur-xl">
            <div className="h-12 w-12 rounded-[var(--radius-lg)] bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center">
              <span className="text-[14px] font-bold text-[hsl(var(--foreground-tertiary))]">SB</span>
            </div>
            <div className="space-y-1">
              <p className="text-[14px] font-medium text-[hsl(var(--foreground))]">3D Experience Unavailable</p>
              <p className="text-[12px] text-[hsl(var(--foreground-tertiary))] max-w-[260px]">
                Your device doesn&apos;t support WebGL or it&apos;s disabled. The portfolio remains fully usable.
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function WrappedWithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
