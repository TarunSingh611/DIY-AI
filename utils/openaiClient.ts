import { OpenAI } from 'openai';

// Load environment variables
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

if (!apiKey) {
  console.error('Missing OpenAI API key');
  throw new Error('API key is not configured. Please check your environment settings.');
}

const baseURL = 'https://api.aimlapi.com';
const systemPrompt = 'You are a travel expert. Provide detailed and personalized travel plans for various destinations.';

// Initialize the OpenAI client
const api = new OpenAI({
  apiKey,
  baseURL,
  dangerouslyAllowBrowser: true
});

// To handle only one request at a time, use a simple mutex approach
let isRequestInProgress = false;

const makeRequest = async (formData: any) => {
  if (isRequestInProgress) {
    console.warn('Request already in progress.');
    return 'Request already in progress.';
  }

  isRequestInProgress = true;

  try {
    // Create a more detailed and context-aware user prompt
    const userPrompt = `
    You are planning a trip for a client. They are visiting ${formData.city}, ${formData.state} in ${formData.country} for ${formData.days} days.
    Please provide a comprehensive travel itinerary that includes the following:
    - Daily activities and points of interest
    - Suggested dining options
    - Tips for navigating the local area
    - Any essential information or travel advice specific to the destination

    Make sure to include recommendations for cultural and popular spots, and consider various interests and preferences the client might have.
    `;

    const completion = await api.chat.completions.create({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 512, // Increased token limit for more comprehensive responses
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating trip plan:', error);
    return 'Unable to generate a trip plan at this time.';
  } finally {
    isRequestInProgress = false;
  }
};

// Function to generate trip plans
export const generateTripPlan = async (formData: any) => {
  return await makeRequest(formData);
};
