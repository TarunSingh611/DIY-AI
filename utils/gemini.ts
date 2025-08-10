import axios from 'axios';
import { parseAndSanitizeRecipe } from './sanitizeRecipe';

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

export async function generateRecipe(ingredients: string[], preferences: any = {}) {
    if (!API_KEY) {
        throw new Error('Google API Key is not defined');
    }

    if (!ingredients || ingredients.length === 0) {
        throw new Error('No ingredients provided. Please add at least one ingredient.');
    }

    const userPrompt = `
  You are a professional chef. Create a creative, delicious recipe based ONLY on the user's input.
  
  Ingredients: ${ingredients.join(', ')}
  
  STRICT RULES:
  - Use ONLY the provided ingredients. Basic essentials (salt, pepper, oil, water) are allowed.
  - DO NOT add any other ingredients.
  - Do NOT suggest ingredients not in the list (e.g., no mushrooms unless given).
  - Recipe title must match actual ingredients used.
  
  
  FORMAT:
  - Title;
  - Ingredients with quantities;
  - Step-by-step instructions;
  - Total cooking time in minutes (just the number);
  - Difficulty level (easy, medium, hard).
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

        const generatedText = response.data.candidates[0]?.content.parts[0]?.text;

        if (!generatedText) {
            throw new Error('No recipe content was generated. Please try again.');
        }

        // Parse the generated text into a structured recipe object
        const parsedRecipe = parseAndSanitizeRecipe(generatedText);
        
        return parsedRecipe;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Gemini API Error:', error.response?.data);
            throw new Error(error.response?.data?.error?.message || 'Failed to generate recipe');
        }
        throw error;
    }
}

export async function generateTaskPriorities(tasks: any[]) {
    if (!API_KEY) {
        throw new Error('Google API Key is not defined');
    }

    if (!tasks || tasks.length === 0) {
        throw new Error('No tasks provided for prioritization');
    }

    const userPrompt = `
You are a task prioritization expert. Analyze the following tasks and assign priority scores (1-100) based on urgency, importance, deadlines, and estimated time.

Consider these factors:
- Urgency: Critical (4), High (3), Medium (2), Low (1)
- Importance: Critical (4), High (3), Medium (2), Low (1)
- Deadline proximity: Closer deadlines get higher priority
- Estimated time: Shorter tasks might get slight priority boost
- Category context: Work tasks might be more important than personal tasks

Tasks to prioritize:
${tasks.map((task, index) => `
${index + 1}. ${task.title}
   - Description: ${task.description}
   - Urgency: ${task.urgency}
   - Importance: ${task.importance}
   - Category: ${task.category}
   - Estimated Time: ${task.estimatedTime} minutes
   - Deadline: ${task.deadline || 'No deadline'}
`).join('\n')}

Return ONLY a JSON array with task IDs and priority scores (1-100, where 100 is highest priority):
[
  {"id": "task_id_1", "priority": 85},
  {"id": "task_id_2", "priority": 72},
  ...
]

Do not include any other text, just the JSON array.
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

        const generatedText = response.data.candidates[0]?.content.parts[0]?.text;
        
        if (!generatedText) {
            throw new Error('No prioritization data was generated');
        }

        // Parse the JSON response
        const priorities = parseTaskPriorities(generatedText, tasks);
        
        return priorities;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Gemini API Error:', error.response?.data);
            throw new Error(error.response?.data?.error?.message || 'Failed to prioritize tasks');
        }
        throw error;
    }
}

function parseTaskPriorities(text: string, tasks: any[]) {
    try {
        // Extract JSON from the response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
            throw new Error('No JSON array found in response');
        }

        const priorities = JSON.parse(jsonMatch[0]);
        
        // Validate the structure
        if (!Array.isArray(priorities)) {
            throw new Error('Response is not an array');
        }

        return priorities.map(item => {
            if (!item.id || typeof item.priority !== 'number') {
                throw new Error('Invalid priority item structure');
            }
            return {
                id: item.id,
                priority: Math.max(1, Math.min(100, item.priority)) // Ensure priority is between 1-100
            };
        });
    } catch (error) {
        console.error('Failed to parse task priorities:', error);
        // Fallback: assign priorities based on urgency and importance
        return calculateFallbackPriorities(tasks);
    }
}

// Fallback priority calculation when AI fails
function calculateFallbackPriorities(tasks: any[]) {
    return tasks.map(task => {
        let priority = 50; // Base priority
        
        // Add urgency points
        const urgencyPoints = { critical: 30, high: 20, medium: 10, low: 0 };
        priority += urgencyPoints[task.urgency] || 0;
        
        // Add importance points
        const importancePoints = { critical: 20, high: 15, medium: 10, low: 5 };
        priority += importancePoints[task.importance] || 0;
        
        // Add deadline proximity points
        if (task.deadline) {
            const deadline = new Date(task.deadline);
            const now = new Date();
            const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            
            if (daysUntilDeadline <= 1) priority += 20;
            else if (daysUntilDeadline <= 3) priority += 15;
            else if (daysUntilDeadline <= 7) priority += 10;
            else if (daysUntilDeadline <= 14) priority += 5;
        }
        
        // Adjust for estimated time (shorter tasks get slight boost)
        if (task.estimatedTime <= 30) priority += 5;
        else if (task.estimatedTime <= 60) priority += 2;
        
        // Ensure priority is within 1-100 range
        priority = Math.max(1, Math.min(100, priority));
        
        return {
            id: task.id,
            priority: priority
        };
    });
}


