"use client";
import { useState, useEffect } from 'react';
import { Plane, MapPin, Calendar, Heart } from 'lucide-react';

const LoadingSpinner = ({ message = "Crafting your perfect itinerary..." }: { message?: string }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { icon: MapPin, text: "Analyzing destination preferences", color: "from-blue-500 to-cyan-500" },
    { icon: Calendar, text: "Optimizing travel schedule", color: "from-purple-500 to-pink-500" },
    { icon: Heart, text: "Personalizing recommendations", color: "from-green-500 to-emerald-500" },
    { icon: Plane, text: "Finalizing your itinerary", color: "from-orange-500 to-red-500" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* Main Loading Animation */}
      <div className="relative mb-8">
        {/* Outer Ring */}
        <div className="w-24 h-24 rounded-full border-4 border-slate-200 animate-spin">
          <div className="w-full h-full rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
        </div>
        
        {/* Inner Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
            <Plane className="h-8 w-8 text-white animate-pulse" />
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 animate-bounce"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 animate-pulse"></div>
      </div>

      {/* Progress Bar */}
      <div className="w-64 mb-6">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Current Step */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${steps[currentStep].color}`}>
            {(() => {
              const Icon = steps[currentStep].icon;
              return <Icon className="h-5 w-5 text-white" />;
            })()}
          </div>
          <div className="text-left">
            <p className="text-sm text-slate-600">Currently</p>
            <p className="font-semibold text-slate-400">{steps[currentStep].text}</p>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-slate-400 mb-2">
          {message}
        </h3>
        <p className="text-slate-600 max-w-md">
          Our AI is analyzing your preferences and creating a personalized travel plan just for you.
        </p>
      </div>

      {/* Loading Dots */}
      <div className="mt-6 flex space-x-1">
        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-md">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
        <p className="text-sm text-blue-800">
          While we're crafting your itinerary, consider checking the weather forecast for your destination 
          and packing accordingly!
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 