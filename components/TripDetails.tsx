

const TripDetails = ({ loading, tripPlan, restaurants }:any) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4 text-blue-700">Your Trip Details</h2>
    {loading ? (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    ) : (
      <>
        {tripPlan && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Trip Plan</h3>
            <p className="text-gray-700">{tripPlan}</p>
          </div>
        )}
        {restaurants && (
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Restaurants & Nightlife</h3>
            <p className="text-gray-700">{restaurants}</p>
          </div>
        )}
      </>
    )}
  </div>
);

export default TripDetails;