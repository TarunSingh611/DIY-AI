import { useState } from 'react';
import ClickToCopy from "./ClickToCopy";
import LoadingSpinner from "./LoadingSpinner";
import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Clock, 
  Star,
  Download,
  Share2,
  Heart,
  BookOpen,
  Camera,
  Utensils,
  Activity,
  ShoppingBag
} from 'lucide-react';

interface TripDetailsProps {
  loading: boolean;
  tripPlan: string;
  formData?: any;
}

const TripDetails = ({ loading, tripPlan, formData }: TripDetailsProps) => {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [isLiked, setIsLiked] = useState(false);

  // Function to parse the tripPlan text  
  const parseTripPlan = (text: string) => {
    return text.split('\n').map((line: string, index: number) => {
      if (line.trim().startsWith('##')) {
        return (
          <h4 key={index} className="text-lg font-semibold text-blue-600 mt-6 mb-3 flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            {line.trim().substring(2).trim()}
          </h4>
        );
      }
      // Handle bullet points (lines starting with '*')  
      if (line.trim().startsWith('*') && !line.trim().startsWith('**')) {
        return (
          <li key={index} className="ml-6 list-disc text-slate-900 mb-2">
            {parseBoldText(line.trim().substring(1).trim())}
          </li>
        );
      }

      // Handle indented lines (lines starting with '\t')  
      if (line.startsWith('\t')) {
        return (
          <p key={index} className="ml-6 text-slate-600 mb-2 italic">
            {parseBoldText(line.trim())}
          </p>
        );
      }

      // Default: Render as a paragraph  
      return (
        <p key={index} className="text-slate-900 mb-3 leading-relaxed">
          {parseBoldText(line.trim())}
        </p>
      );
    });
  };

  // Function to parse bold text (text enclosed in **)  
  const parseBoldText = (line: string) => {
    const parts = line.split(/(\*\*.*?\*\*)/); // Split by bold markers (**)  
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-slate-900">
            {part.slice(2, -2)} {/* Remove the ** markers */}
          </strong>
        );
      }
      return part; // Return normal text  
    });
  };

  const tabs = [
    { id: 'itinerary', label: 'Itinerary', icon: Calendar },
    { id: 'highlights', label: 'Highlights', icon: Star },
    { id: 'tips', label: 'Travel Tips', icon: BookOpen },
  ];

  const actionButtons = [
    { icon: Heart, label: isLiked ? 'Liked' : 'Like', action: () => setIsLiked(!isLiked) },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 to-emerald-600">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="card-title">Your Travel Itinerary</h2>
              <p className="card-description">
                Personalized plan crafted just for you
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {actionButtons.map((button) => {
              const Icon = button.icon;
              return (
                <button
                  key={button.label}
                  onClick={button.action}
                  className="btn btn-outline btn-sm"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">{button.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card-content">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {tripPlan && (
              <div className="space-y-6">
                {/* Trip Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Duration</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900 mt-1">
                      {formData?.days ? `${formData.days} Days` : 'N/A'}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-900">Destination</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900 mt-1">
                      {formData?.city ? `${formData.city}, ${formData.state || ''} ${formData.country || ''}`.trim() : 'N/A'}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-900">Budget</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900 mt-1">
                      {formData?.budget ? `$${formData.budget.toLocaleString()}` : 'N/A'}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-orange-600" />
                      <span className="text-sm font-medium text-orange-900">Travelers</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-900 mt-1">
                      {formData?.travelers || 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-slate-200">
                  <nav className="flex space-x-8">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeTab === tab.id
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                  {activeTab === 'itinerary' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-slate-900">Your Itinerary</h3>
                        <ClickToCopy text={tripPlan} />
                      </div>
                      
                      <div className="prose prose-slate max-w-none">
                        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                          {parseTripPlan(tripPlan)}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'highlights' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-slate-900">Trip Highlights</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-slate-900 flex items-center">
                            <Camera className="h-5 w-5 mr-2 text-blue-600" />
                            Must-See Attractions
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex items-start space-x-3">
                              <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-slate-900">Eiffel Tower & Seine River Cruise</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-slate-900">Louvre Museum & Notre-Dame</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-slate-900">Arc de Triomphe & Champs-Élysées</span>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-slate-900 flex items-center">
                            <Utensils className="h-5 w-5 mr-2 text-green-600" />
                            Culinary Experiences
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex items-start space-x-3">
                              <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-slate-900">Traditional French Bistros</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-slate-900">Wine Tasting in Montmartre</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-slate-900">Local Market Food Tour</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'tips' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-slate-900">Travel Tips</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                          <h4 className="text-lg font-semibold text-blue-900 mb-3">Best Time to Visit</h4>
                          <p className="text-blue-800 text-sm leading-relaxed">
                            Spring (April-June) and Fall (September-October) offer the best weather and fewer crowds. 
                            Avoid July-August for peak tourist season.
                          </p>
                        </div>

                        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                          <h4 className="text-lg font-semibold text-green-900 mb-3">Local Transportation</h4>
                          <p className="text-green-800 text-sm leading-relaxed">
                            Purchase a Paris Visite pass for unlimited metro, bus, and RER travel. 
                            Walking is often the best way to explore central Paris.
                          </p>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                          <h4 className="text-lg font-semibold text-purple-900 mb-3">Cultural Etiquette</h4>
                          <p className="text-purple-800 text-sm leading-relaxed">
                            Always greet with "Bonjour" and say "Merci" when leaving shops. 
                            Dress modestly when visiting religious sites.
                          </p>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                          <h4 className="text-lg font-semibold text-orange-900 mb-3">Safety Tips</h4>
                          <p className="text-orange-800 text-sm leading-relaxed">
                            Be aware of pickpockets in tourist areas. Keep valuables secure and 
                            avoid displaying expensive items in crowded places.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TripDetails;  