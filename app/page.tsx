"use client";
import { useState } from 'react';
import Head from 'next/head';
import TripDetails from '@/components/TripDetails';
import { travelCities } from '@/lib/locations'; // Ensure this path is correct
import { generateTripPlan } from '@/utils/gemini'; // Ensure this path is correct
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Define the validation schema including the country field
const validationSchema = Yup.object().shape({
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  days: Yup.number()
    .required('Number of days is required')
    .min(1, 'Number of days must be at least 1')
    .integer('Number of days must be an integer'),
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState('');

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setLoading(true);
    try {
      // Add country to the form data when calling generateTripPlan
      const tripResponse: any = await generateTripPlan(values);
      setTripPlan(tripResponse);
    } catch (error) {
      setTripPlan('Unable to generate a trip plan at this time.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-teal-100">
      <Head>
        <title>Travel Planner</title>
        <meta name="description" content="Plan your perfect trip" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Travel Planner</h1>

        <div className="grid  gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Formik
              initialValues={{ country: '', state: '', city: '', days: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values }) => (
                <Form>
                  <div className="mb-4">
                    <label htmlFor="country" className="block text-sm font-medium text-blue-700">Country</label>
                    <Field
                      as="select"
                      name="country"
                      id="country"
                      className="mt-1 block w-full rounded-md text-slate-500 border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value="" className='text-slate-500'>Select a country</option>
                      {Object.keys(travelCities).map(country => (
                        <option className='text-slate-500' key={country} value={country}>{country}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="country" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="state" className="block text-sm font-medium text-blue-700">State/Province</label>
                    <Field
                      as="select"
                      name="state"
                      id="state"
                      className="mt-1 block w-full rounded-md text-slate-500 border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      disabled={!values.country}
                    >
                      <option value="" className='text-slate-500'>Select a state/province</option>
                      {values.country && Object.keys(travelCities[values.country] || {}).map(state => (
                        <option className='text-slate-500' key={state} value={state}>{state}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="state" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-blue-700">City</label>
                    <Field
                      as="select"
                      name="city"
                      id="city"
                      className="mt-1 block w-full text-slate-500 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      disabled={!values.state}
                    >
                      <option value="" className='text-slate-500'>Select a city</option>
                      {(travelCities[values.country]?.[values.state] || []).map((city: any) => (
                        <option className='text-slate-500' key={city} value={city}>{city}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="city" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="days" className="block text-sm font-medium text-blue-700">Number of days</label>
                    <Field
                      type="number"
                      id="days"
                      name="days"
                      className="mt-1 block w-full text-slate-500 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      min="1"
                    />
                    <ErrorMessage name="days" component="div" className="text-red-600 text-sm" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                  >
                    {loading ? 'Generating...' : 'Generate Trip'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <TripDetails
              loading={loading}
              tripPlan={tripPlan}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
