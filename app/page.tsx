"use client";
import { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TravelPlannerForm from '@/components/TravelPlannerForm';
import TripDetails from '@/components/TripDetails';
import Footer from '@/components/Footer';
import { generateTripPlan } from '@/utils/gemini';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setLoading(true);
    setShowResults(false);
    
    try {
      const tripResponse: any = await generateTripPlan(values);
      setTripPlan(tripResponse);
      setShowResults(true);
      
      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('trip-results')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } catch (error) {
      setTripPlan('Unable to generate a trip plan at this time. Please try again later.');
      setShowResults(true);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Head>
        <title>Wanderlust - AI Travel Planner</title>
        <meta name="description" content="Plan your perfect trip with AI-powered travel planning" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Travel Planner Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-400 mb-4">
                  Start Your Journey
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Tell us about your dream destination and preferences. Our AI will create a personalized 
                  itinerary that matches your style, budget, and interests.
                </p>
              </div>

              <TravelPlannerForm onSubmit={handleSubmit} loading={loading} />
            </div>
          </div>
        </section>

        {/* Results Section */}
        {showResults && (
          <section id="trip-results" className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <TripDetails loading={loading} tripPlan={tripPlan} />
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-400 mb-4">
                  Why Choose Wanderlust?
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Experience the future of travel planning with our advanced AI technology
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="card-header">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 mb-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="card-title">AI-Powered Planning</h3>
                    <p className="card-description">
                      Our advanced AI analyzes your preferences to create perfectly tailored itineraries
                    </p>
                  </div>
                </div>

                <div className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="card-header">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 mb-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="card-title">Smart Recommendations</h3>
                    <p className="card-description">
                      Get personalized suggestions for attractions, restaurants, and activities
                    </p>
                  </div>
                </div>

                <div className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="card-header">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 mb-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="card-title">Time Optimization</h3>
                    <p className="card-description">
                      Maximize your travel time with efficient routing and scheduling
                    </p>
                  </div>
                </div>

                <div className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="card-header">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-600 to-red-600 mb-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <h3 className="card-title">Budget Management</h3>
                    <p className="card-description">
                      Stay within your budget with cost-effective recommendations
                    </p>
                  </div>
                </div>

                <div className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="card-header">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 mb-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="card-title">Personalized Experience</h3>
                    <p className="card-description">
                      Every itinerary is crafted to match your unique travel style
                    </p>
                  </div>
                </div>

                <div className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="card-header">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-cyan-600 mb-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="card-title">Instant Results</h3>
                    <p className="card-description">
                      Get your complete travel plan in seconds, not hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

                 {/* CTA Section */}
         <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-cyan-600">
           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="max-w-4xl mx-auto text-center">
               <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                 Ready to Start Your Adventure?
               </h2>
               <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                 Join thousands of travelers who have already discovered their perfect destinations 
                 with our AI-powered travel planner.
               </p>
             </div>
           </div>
         </section>
      </main>

      <Footer />
    </div>
  );
}
