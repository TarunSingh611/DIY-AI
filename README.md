# AI Travel Planner & Productivity Hub 🚀

[![Next.js](https://img.shields.io/badge/Next.js-14.2.11-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini_AI-1.5-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> A comprehensive AI-powered platform featuring travel planning, recipe generation, and intelligent task prioritization. Built with modern web technologies and Google's Gemini AI for smart content generation and decision-making.
 
## ✨ Features

### 🛫 **AI Travel Planner**
- **Smart Itinerary Generation**: Create detailed travel plans based on destination and preferences
- **Personalized Recommendations**: Get tailored suggestions for attractions, restaurants, and activities
- **Comprehensive Coverage**: Daily schedules, dining recommendations, travel tips, and cultural insights
- **Real-time AI Processing**: Instant results powered by Google's Gemini AI
- **Beautiful Formatting**: Markdown-rendered travel plans with syntax highlighting
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🍳 **AI Recipe Generator**
- **Ingredient-Based Creation**: Generate recipes using only your available ingredients
- **AI-Powered Recipes**: Create unique, delicious recipes with AI assistance
- **Recipe Management**: Save, view, and manage your generated recipe collection
- **Copy & Share**: Easy recipe copying and sharing functionality
- **Visual Recipe Cards**: Beautiful cards with ingredients and step-by-step instructions
- **Smart Suggestions**: Quick ingredient suggestions for common items

### 🎯 **AI Task Prioritizer**
- **Intelligent Prioritization**: AI-powered task ranking based on urgency, importance, deadlines, and time estimates
- **Smart Decision Making**: Beat decision fatigue with AI-calculated priority scores (1-100)
- **Comprehensive Task Management**: Add, edit, complete, and delete tasks with full details
- **Advanced Filtering**: Filter by status (all, pending, completed) and sort by multiple criteria
- **Mobile-Optimized**: Responsive design with touch-friendly interface
- **Data Export/Import**: Backup and restore your task data with JSON export/import
- **Real-time Stats**: Track total tasks, pending, completed, and high-priority items
- **Priority Visualization**: Color-coded priority levels with clear visual indicators

### 🎯 **Platform Features**
- **Multi-App Interface**: Single platform for multiple AI applications
- **Seamless Navigation**: Easy switching between applications with back-to-home functionality
- **Responsive Design**: Perfect experience across desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations and gradients
- **Error Handling**: Robust error handling and user feedback
- **Scalable Architecture**: Easy to add new AI applications
- **Local Storage**: Persistent data storage for tasks and recipes

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 14](https://nextjs.org/) with App Router |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **AI Integration** | [Google Gemini AI](https://ai.google.dev/) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Forms** | React hooks with custom validation |
| **Deployment** | [Vercel](https://vercel.com/) (Recommended) |

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Google Gemini API key** ([Get one here](https://ai.google.dev/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-travel-planner.git
   cd ai-travel-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_GOOGLE_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### 🏠 **Home Page**
- Select from available AI applications
- Navigate between different tools seamlessly
- View platform features and capabilities

### 🛫 **Travel Planner**
1. Enter destination details (city, state, country)
2. Specify trip duration and preferences
3. Get AI-generated travel itinerary
4. View formatted results with recommendations
5. Copy and share your travel plan

### 🍳 **Recipe Generator**
1. Add ingredients you have available
2. Use quick suggestions or type custom ingredients
3. Generate unique recipes using AI
4. View recipe cards with ingredients and instructions
5. Copy individual recipes or all recipes at once
6. Manage your recipe collection

### 🎯 **Task Prioritizer**
1. **Add Tasks**: Create detailed tasks with title, description, urgency, importance, category, time estimates, and deadlines
2. **AI Prioritization**: Use AI to automatically rank tasks based on multiple factors
3. **Smart Filtering**: Filter tasks by status and sort by priority, urgency, importance, or deadline
4. **Task Management**: Mark tasks as complete, edit details, or delete tasks
5. **Data Management**: Export your tasks as JSON or import existing task data
6. **Mobile Optimization**: Use the mobile-friendly interface with optimized layouts

## 📁 Project Structure

```
ai-travel-planner/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Home page (app selection)
│   ├── travel-planner/           # Travel planner app
│   │   └── page.tsx
│   ├── recipe-generator/         # Recipe generator app
│   │   └── page.tsx
│   └── task-prioritizer/         # Task prioritizer app
│       ├── page.tsx
│       └── layout.tsx
├── components/                   # React components
│   ├── Header.tsx               # Navigation header
│   ├── Hero.tsx                 # Hero section
│   ├── Footer.tsx               # Footer component
│   ├── TravelPlannerForm.tsx    # Travel form component
│   ├── TripDetails.tsx          # Trip results display
│   ├── ClickToCopy.tsx          # Copy functionality
│   ├── LoadingSpinner.tsx       # Loading component
│   └── ErrorBoundary.jsx        # Error handling
├── lib/                         # Library files
│   ├── taskStore.ts             # Zustand store for task management
│   ├── locations.ts             # Location data
│   └── usaCities.ts             # US cities data
├── utils/                        # Utility functions
│   ├── gemini.ts                # Google Gemini AI integration
│   └── sanitizeRecipe.ts        # Recipe parsing utilities
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── tailwind.config.ts           # Tailwind configuration
└── README.md                    # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GOOGLE_API_KEY` | Google Gemini AI API key | ✅ Yes |

### API Configuration

The application uses Google's Gemini AI API for content generation and task prioritization. Make sure to:
- Get your API key from [Google AI Studio](https://ai.google.dev/)
- Add it to your `.env.local` file
- Keep your API key secure and never commit it to version control

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** if applicable
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write clean, readable code
- Add comments for complex logic
- Test your changes thoroughly
- Ensure mobile responsiveness

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

### 🚀 **Upcoming Features**
- [ ] **Content Writer**: AI-powered content generation
- [ ] **Code Assistant**: Programming help and code generation
- [ ] **Image Generator**: AI image creation tools
- [ ] **User Authentication**: User accounts and data persistence
- [ ] **Social Features**: Recipe, trip, and task sharing
- [ ] **Advanced Search**: Enhanced filtering and search capabilities
- [ ] **Mobile Apps**: Native iOS and Android applications
- [ ] **Calendar Integration**: Sync tasks with Google Calendar, Outlook
- [ ] **Team Collaboration**: Shared task lists and project management
- [ ] **Time Tracking**: Track time spent on tasks and generate reports

### 🔧 **Technical Improvements**
- [ ] **Performance Optimization**: Better loading times and caching
- [ ] **Offline Support**: Progressive Web App features
- [ ] **Internationalization**: Multi-language support
- [ ] **Advanced Analytics**: Usage tracking and insights
- [ ] **API Rate Limiting**: Better API usage management
- [ ] **Database Integration**: Persistent storage with PostgreSQL/MongoDB
- [ ] **Real-time Updates**: WebSocket integration for live updates
- [ ] **Advanced AI Models**: Integration with additional AI services

## 📞 Support

If you have any questions or need help:

- **Create an issue** on GitHub
- **Check the documentation** in this README
- **Review existing issues** for solutions

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful AI capabilities
- **Next.js team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Zustand** for lightweight state management
- **Lucide React** for beautiful icons
- **Open source community** for various libraries and tools

---

<div align="center">

**Made with ❤️ for productivity enthusiasts worldwide**

[⭐ Star this repo](https://github.com/yourusername/ai-travel-planner) | [🐛 Report a bug](https://github.com/yourusername/ai-travel-planner/issues) | [💡 Request a feature](https://github.com/yourusername/ai-travel-planner/issues)

</div>
