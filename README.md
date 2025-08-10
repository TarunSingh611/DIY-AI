# DIY_AI Hub

## Overview

DIY_AI Hub is a comprehensive web application that provides multiple AI-powered tools in a single platform. Users can choose from different AI applications, each designed for specific use cases. Currently, the platform includes a Travel Planner and Recipe Generator, with more applications planned for the future.

## Available Applications

### 🛫 Travel Planner
- **AI-Powered Trip Planning**: Generate detailed travel itineraries based on destination and preferences
- **Smart Recommendations**: Get personalized suggestions for attractions, restaurants, and activities
- **Comprehensive Coverage**: Includes daily schedules, dining recommendations, travel tips, and cultural insights
- **Markdown Rendering**: Beautifully formatted travel plans with syntax highlighting and external links

### 🍳 Recipe Generator
- **Ingredient-Based Recipes**: Create delicious recipes from your available ingredients
- **AI Recipe Creation**: Generate unique recipes using only the ingredients you specify
- **Recipe Management**: Save, view, and manage your generated recipes
- **Visual Recipe Cards**: Beautiful recipe cards with images, ingredients, and step-by-step instructions

## Features

- **Multi-App Platform**: Single interface to access multiple AI-powered applications
- **Seamless Navigation**: Easy switching between different applications with back-to-home functionality
- **Consistent Design**: Unified design language across all applications
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time AI Generation**: Instant results powered by Google's Gemini AI
- **Error Handling**: Robust error handling and user feedback

## Technologies Used

- **Next.js**: React framework for server-side rendering and routing
- **TypeScript**: Type-safe JavaScript for better development experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Google Gemini AI**: Advanced AI model for content generation
- **Axios**: HTTP client for API requests
- **Lucide React**: Beautiful icon library
- **Formik & Yup**: Form management and validation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd diy-ai-hub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add:
```
NEXT_PUBLIC_GOOGLE_API_KEY=your_gemini_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Home Page**: Select from available AI applications
2. **Travel Planner**: 
   - Enter destination details (city, state, country, duration)
   - Get AI-generated travel itinerary
   - View formatted results with recommendations
3. **Recipe Generator**:
   - Add ingredients you have available
   - Generate unique recipes using AI
   - Save and manage your recipe collection

## Project Structure

```
diy-ai-hub/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── TravelPlannerApp.tsx
│   ├── RecipeGeneratorApp.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   └── ...
├── utils/                  # Utility functions
│   └── gemini.ts          # AI API integration
├── lib/                    # Library files
└── public/                 # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- Additional AI applications (Content Writer, Code Assistant, etc.)
- User authentication and recipe/trip saving
- Social sharing features
- Advanced filtering and search capabilities
- Mobile app versions
