"use client";
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { 
  Globe, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Heart,
  Plane,
  Hotel,
  Utensils,
  Camera,
  ShoppingBag,
  Activity
} from 'lucide-react';
import { travelCities, currencies } from '@/lib/locations';

const validationSchema = Yup.object().shape({
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  days: Yup.number()
    .required('Number of days is required')
    .min(1, 'Number of days must be at least 1')
    .max(30, 'Maximum 30 days allowed'),
  budget: Yup.number()
    .min(100, 'Minimum budget is $100')
    .max(50000, 'Maximum budget is $50,000'),
  travelers: Yup.number()
    .min(1, 'At least 1 traveler required')
    .max(20, 'Maximum 20 travelers'),
  interests: Yup.array().min(1, 'Select at least one interest'),
  accommodation: Yup.string().required('Accommodation type is required'),
  pace: Yup.string().required('Travel pace is required'),
});

const interests = [
  { id: 'culture', label: 'Culture & History', icon: Camera },
  { id: 'food', label: 'Food & Dining', icon: Utensils },
  { id: 'nature', label: 'Nature & Outdoors', icon: Activity },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
  { id: 'adventure', label: 'Adventure', icon: Activity },
  { id: 'relaxation', label: 'Relaxation', icon: Heart },
];

const accommodationTypes = [
  { value: 'budget', label: 'Budget', description: 'Hostels, budget hotels' },
  { value: 'mid-range', label: 'Mid-Range', description: '3-4 star hotels' },
  { value: 'luxury', label: 'Luxury', description: '5-star hotels, resorts' },
  { value: 'unique', label: 'Unique', description: 'Boutique, local stays' },
];

const travelPaces = [
  { value: 'relaxed', label: 'Relaxed', description: 'Take it easy, minimal rushing' },
  { value: 'moderate', label: 'Moderate', description: 'Balanced pace, some free time' },
  { value: 'fast', label: 'Fast-paced', description: 'Pack it in, see everything' },
];

const TravelPlannerForm = ({ onSubmit, loading }: any) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  // Get currency symbol for selected currency
  const getCurrencySymbol = (currencyCode: string) => {
    const currency = currencies.find(c => c.code === currencyCode);
    return currency?.symbol || '$';
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600">
            <Plane className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="card-title">Plan Your Perfect Trip</h2>
            <p className="card-description">
              Tell us about your dream destination and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="card-content">
        <Formik
          initialValues={{
            country: '',
            state: '',
            city: '',
            days: '',
            budget: '',
            currency: 'USD',
            travelers: 1,
            interests: [],
            accommodation: '',
            pace: '',
            specialRequests: '',
            
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-6">
              {/* Destination Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-400 flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <span>Destination</span>
                </h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-slate-300 mb-2">
                      Country
                    </label>
                    <Field
                      as="select"
                      name="country"
                      id="country"
                      className="input"
                    >
                      <option value="">Select a country</option>
                      {Object.keys(travelCities).map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="country" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-slate-300 mb-2">
                      State/Province
                    </label>
                    <Field
                      as="select"
                      name="state"
                      id="state"
                      className="input"
                      disabled={!values.country}
                    >
                      <option value="">Select a state/province</option>
                      {values.country && Object.keys(travelCities[values.country] || {}).map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="state" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-slate-300 mb-2">
                      City
                    </label>
                    <Field
                      as="select"
                      name="city"
                      id="city"
                      className="input"
                      disabled={!values.state}
                    >
                      <option value="">Select a city</option>
                      {(travelCities[values.country]?.[values.state] || []).map((city: any) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="city" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                </div>

                
               </div>

              {/* Trip Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-400 flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Trip Details</span>
                </h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="days" className="block text-sm font-medium text-slate-300 mb-2">
                      Number of Days
                    </label>
                    <Field
                      type="number"
                      id="days"
                      name="days"
                      className="input"
                      min="1"
                      max="30"
                      placeholder="e.g., 7"
                    />
                    <ErrorMessage name="days" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="travelers" className="block text-sm font-medium text-slate-300 mb-2">
                      Number of Travelers
                    </label>
                    <Field
                      type="number"
                      id="travelers"
                      name="travelers"
                      className="input"
                      min="1"
                      max="20"
                      placeholder="e.g., 2"
                    />
                    <ErrorMessage name="travelers" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                                     <div>
                     <label htmlFor="budget" className="block text-sm font-medium text-slate-300 mb-2">
                       Budget
                     </label>
                     <div className="grid grid-cols-3 gap-2">
                       <div className="col-span-2">
                         <div className="relative">
                           <span className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 font-medium">
                             {getCurrencySymbol(values.currency)}
                           </span>
                           <Field
                             type="number"
                             id="budget"
                             name="budget"
                             className="input pl-10"
                             placeholder="e.g., 2000"
                           />
                         </div>
                       </div>
                       <div>
                         <Field
                           as="select"
                           name="currency"
                           className="input"
                           onChange={(e: any) => {
                             setFieldValue('currency', e.target.value);
                             setSelectedCurrency(e.target.value);
                           }}
                         >
                           {currencies.map(currency => (
                             <option key={currency.code} value={currency.code}>
                               {currency.symbol} {currency.code}
                             </option>
                           ))}
                         </Field>
                       </div>
                     </div>
                     <ErrorMessage name="budget" component="div" className="text-red-600 text-sm mt-1" />
                   </div>
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-400 flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-blue-600" />
                  <span>Interests & Activities</span>
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interests.map((interest) => {
                    const Icon = interest.icon;
                    const isSelected = selectedInterests.includes(interest.id);
                    
                    return (
                      <button
                        key={interest.id}
                        type="button"
                        onClick={() => {
                          handleInterestToggle(interest.id);
                          setFieldValue('interests', selectedInterests.includes(interest.id) 
                            ? selectedInterests.filter(id => id !== interest.id)
                            : [...selectedInterests, interest.id]
                          );
                        }}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`h-5 w-5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                          <span className="text-sm font-medium">{interest.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <ErrorMessage name="interests" component="div" className="text-red-600 text-sm" />
              </div>

              {/* Accommodation & Pace */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-400 flex items-center space-x-2">
                    <Hotel className="h-5 w-5 text-blue-600" />
                    <span>Accommodation</span>
                  </h3>
                  
                  <div className="space-y-3">
                    {accommodationTypes.map((type) => (
                      <label key={type.value} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:border-slate-300 cursor-pointer">
                        <Field
                          type="radio"
                          name="accommodation"
                          value={type.value}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-slate-400">{type.label}</div>
                          <div className="text-sm text-slate-600">{type.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <ErrorMessage name="accommodation" component="div" className="text-red-600 text-sm" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-400 flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <span>Travel Pace</span>
                  </h3>
                  
                  <div className="space-y-3">
                    {travelPaces.map((pace) => (
                      <label key={pace.value} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:border-slate-300 cursor-pointer">
                        <Field
                          type="radio"
                          name="pace"
                          value={pace.value}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-slate-400">{pace.label}</div>
                          <div className="text-sm text-slate-600">{pace.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <ErrorMessage name="pace" component="div" className="text-red-600 text-sm" />
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-400">Special Requests</h3>
                <Field
                  as="textarea"
                  name="specialRequests"
                  placeholder="Any special requirements, accessibility needs, dietary restrictions, or other preferences..."
                  className="input min-h-[100px] resize-none"
                  rows={4}
                />
              </div>

                             {/* Submit Button */}
               <button
                 type="submit"
                 disabled={isSubmitting || loading}
                 className="btn btn-primary btn-lg w-full group"
                 
               >
                 {loading ? (
                   <div className="flex items-center space-x-2">
                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                     <span>Crafting Your Perfect Itinerary...</span>
                   </div>
                 ) : (
                   <div className="flex items-center space-x-2">
                     <Plane className="h-5 w-5" />
                     <span>Generate My Travel Plan</span>
                   </div>
                 )}
               </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TravelPlannerForm; 