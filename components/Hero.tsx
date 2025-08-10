"use client";
import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Zap, Brain, Star } from 'lucide-react';

const Hero = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    { icon: Sparkles, text: "AI-Powered Applications", color: "from-blue-500 to-cyan-500" },
    { icon: Zap, text: "Instant Results", color: "from-purple-500 to-pink-500" },
    { icon: Brain, text: "Smart Solutions", color: "from-green-500 to-emerald-500" },
    { icon: Star, text: "Multiple Tools", color: "from-orange-500 to-red-500" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-20 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-green-400/10 to-emerald-400/10 blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                <span className="gradient-text">Your AI Assistant</span>
                <br />
                <span className="text-slate-400">Hub</span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-2xl">
                Choose from multiple AI-powered applications designed to make your life easier. 
                From travel planning to recipe generation, we've got you covered.
              </p>
            </div>

            {/* Feature Highlight */}
            <div className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${features[currentFeature].color}`}>
                {(() => {
                  const Icon = features[currentFeature].icon;
                  return <Icon className="h-6 w-6 text-white" />;
                })()}
              </div>
              <div>
                <p className="text-sm text-slate-600">Now featuring</p>
                <p className="font-semibold text-slate-400">{features[currentFeature].text}</p>
              </div>
            </div>


          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Card */}
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10"></div>
                <div className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-sm text-slate-500">DIY_AI Hub</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-white text-sm">✈️</span>
                      </div>
                      <div className="flex-1">
                        <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <span className="text-white text-sm">🍳</span>
                      </div>
                      <div className="flex-1">
                        <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <div className="text-sm font-medium text-slate-400 mb-2">Available Applications</div>
                    <div className="text-xs text-slate-600">
                      Travel Planner • Recipe Generator • More coming soon...
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-20 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 