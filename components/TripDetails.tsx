import ClickToCopy from "./ClickToCopy";

const TripDetails = ({ loading, tripPlan }: any) => {
  // Function to parse the tripPlan text  
  const parseTripPlan = (text: string) => {
    return text.split('\n').map((line: string, index: number) => {

      if (line.trim().startsWith('##')) {
        return (
          <h4 key={index} className="text-lg font-semibold text-blue-600 mt-4">
            {line.trim().substring(2).trim()}
          </h4>
        );
      }
      // Handle bullet points (lines starting with '*')  
      if (line.trim().startsWith('*') && !line.trim().startsWith('**')) {
        return (
          <li key={index} className="ml-6 list-disc">
            {parseBoldText(line.trim().substring(1).trim())}
          </li>
        );
      }

      // Handle indented lines (lines starting with '\t')  
      if (line.startsWith('\t')) {
        return (
          <p key={index} className="ml-6 text-gray-700">
            {parseBoldText(line.trim())}
          </p>
        );
      }

      // Default: Render as a paragraph  
      return (
        <p key={index} className="text-gray-700">
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
          <strong key={index} className="font-semibold">
            {part.slice(2, -2)} {/* Remove the ** markers */}
          </strong>
        );
      }
      return part; // Return normal text  
    });
  };

  return (
    <div>
      <h2 className="flex justify-between text-2xl font-semibold mb-4 text-blue-700">Your Trip Details <ClickToCopy text={tripPlan} /></h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {tripPlan && (
            <div className="mb-6">
              {/* Render parsed tripPlan */}
              <div className="text-gray-700 space-y-2">
              {parseTripPlan(tripPlan)}  
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TripDetails;  