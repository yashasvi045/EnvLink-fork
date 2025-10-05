import React, { ReactNode } from 'react';
import { Card } from './ui/card';
import { Loader2 } from 'lucide-react';

interface LoadingProviderProps {
  children: ReactNode;
  isLoading: boolean;
  loadingText?: string;
  overlay?: boolean;
}

export function LoadingProvider({ 
  children, 
  isLoading, 
  loadingText = 'Loading...',
  overlay = false 
}: LoadingProviderProps) {
  if (!isLoading) {
    return <>{children}</>;
  }

  if (overlay) {
    return (
      <div className="relative">
        {children}
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <Card className="p-6 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
            <p className="text-gray-600">{loadingText}</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <Card className="p-8 text-center max-w-sm w-full">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {loadingText}
        </h2>
        <p className="text-gray-600">
          Please wait while we load your data...
        </p>
      </Card>
    </div>
  );
}
