"use client";
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text">DIY_AI</h1>
              <p className="text-xs text-muted-foreground">Your AI Assistant Hub</p>
            </div>
          </div>

          {/* Simple branding for mobile */}
          <div className="sm:hidden">
            <h1 className="text-lg font-bold gradient-text">DIY_AI</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 