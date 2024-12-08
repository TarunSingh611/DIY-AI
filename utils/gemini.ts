import axios from 'axios';

const API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

interface GeminiRequest {
    contents: Array<{
        parts: Array<{
            text: string;
        }>;
    }>;
}

interface GeminiResponse {
    candidates: Array<{
        content: {
            parts: Array<{
                text: string;
            }>;
        };
    }>;
}

export async function generateTripPlan(formData: any) {
    if (!API_KEY) {
        throw new Error('Google API Key is not defined');
    }
    const userPrompt = `  
                You are a travel assistant helping a client plan their trip. The client is visiting ${formData.city}, ${formData.state}, ${formData.country} for ${formData.days} days.   

                Please create a detailed and user-friendly travel itinerary that includes the following:  
                1. **Daily Schedule**: Provide a day-by-day breakdown of activities, including must-visit attractions, cultural landmarks, and popular spots.  
                2. **Dining Recommendations**: Suggest restaurants or cafes for each day, considering local cuisine and diverse preferences.  
                3. **Travel Tips**: Include practical advice for navigating the destination, such as transportation options, local customs, and safety tips.  
                4. **Essential Information**: Highlight any important details, such as weather considerations, packing tips, or local events during the visit.  
                5. **Culture and History**: Discuss the cultural heritage, historical landmarks, and significant events in the destination.
                6. **Local Customs**: Explain the local customs and traditions that may be of interest to the client.
                7. **Safety and Accessibility**: Address any safety concerns, such as accessibility issues, and provide recommendations for accessibility features.

                Ensure the itinerary is concise, engaging, informative, and tailored to appeal to a wide range of interests. The content should be structured and easy to integrate into an app for users to explore and follow.  
            `;
    const requestBody: GeminiRequest = {
        contents: [{
            parts: [{
                text: userPrompt
            }]
        }]
    };

    try {
        const response = await axios.post<GeminiResponse>(
            `${API_BASE_URL}/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        // Extract and return the generated text
        return response.data.candidates[0]?.content.parts[0]?.text || '';
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Gemini API Error:', error.response?.data);
            throw new Error(error.response?.data?.error?.message || 'Failed to generate content');
        }
        throw error;
    }
}
