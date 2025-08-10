"use client";
import Head from 'next/head';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  const apps = [
    {
      id: 'travel-planner',
      name: 'Travel Planner',
      description: 'Plan your perfect trip with AI-powered travel planning',
      icon: '✈️',
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'from-slate-50 via-blue-50 to-cyan-50',
      href: '/travel-planner'
    },
    {
      id: 'recipe-generator',
      name: 'Recipe Generator',
      description: 'Create delicious recipes from your available ingredients',
      icon: '🍳',
      color: 'from-green-600 to-emerald-600',
      bgColor: 'from-green-50 via-emerald-50 to-teal-50',
      href: '/recipe-generator'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Head>
        <title>DIY_AI - Your AI Assistant Hub</title>
        <meta name="description" content="Choose from multiple AI-powered applications" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* App Selection Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-400 mb-4">
                  Choose Your AI Assistant
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Select from our collection of AI-powered applications designed to make your life easier
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {apps.map((app) => (
                  <Link
                    key={app.id}
                    href={app.href}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full border border-gray-100 overflow-hidden">
                      <div className="p-8 text-center">
                        <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${app.color} mb-6 mx-auto text-4xl shadow-lg`}>
                          {app.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">{app.name}</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {app.description}
                        </p>
                        <div className="mt-6">
                          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 group-hover:from-blue-700 group-hover:to-blue-800">
                            <span>Launch {app.name}</span>
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-400 mb-4">
                  Why Choose DIY_AI?
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Experience the power of AI across multiple domains with our specialized applications
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
                    <h3 className="card-title">AI-Powered Solutions</h3>
                    <p className="card-description">
                      Each app leverages advanced AI to provide intelligent, personalized assistance
                    </p>
                  </div>
                </div>

                <div className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="card-header">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 mb-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="card-title">Specialized Tools</h3>
                    <p className="card-description">
                      Each application is designed for specific use cases with tailored functionality
                    </p>
                  </div>
                </div>

                <div className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="card-header">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 mb-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="card-title">Instant Results</h3>
                    <p className="card-description">
                      Get immediate, high-quality results powered by cutting-edge AI technology
                    </p>
                  </div>
                </div>

                <div className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="card-header">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-600 to-red-600 mb-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="card-title">Secure & Private</h3>
                    <p className="card-description">
                      Your data is protected with enterprise-grade security measures
                    </p>
                  </div>
                </div>

                <div className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="card-header">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 mb-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="card-title">Mobile Friendly</h3>
                    <p className="card-description">
                      Access all applications seamlessly across desktop and mobile devices
                    </p>
                  </div>
                </div>

                <div className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="card-header">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-cyan-600 mb-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                    </div>
                    <h3 className="card-title">Easy to Use</h3>
                    <p className="card-description">
                      Intuitive interfaces designed for users of all technical levels
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
                Ready to Get Started?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Choose your AI assistant and experience the future of intelligent applications
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
