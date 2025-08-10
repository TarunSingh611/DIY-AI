# DIY_AI Hub 🚀

[![Next.js](https://img.shields.io/badge/Next.js-14.2.11-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini_AI-1.5-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> A comprehensive multi-application AI platform that provides various AI-powered tools in a single interface. Built with modern web technologies and Google's Gemini AI for intelligent content generation.

## ✨ Features

### 🛫 **AI Travel Planner**
- **Smart Itinerary Generation**: Create detailed travel plans based on destination and preferences
- **Personalized Recommendations**: Get tailored suggestions for attractions, restaurants, and activities
- **Comprehensive Coverage**: Daily schedules, dining recommendations, travel tips, and cultural insights
- **Real-time AI Processing**: Instant results powered by Google's Gemini AI
- **Beautiful Formatting**: Markdown-rendered travel plans with syntax highlighting

### 🍳 **AI Recipe Generator**
- **Ingredient-Based Creation**: Generate recipes using only your available ingredients
- **AI-Powered Recipes**: Create unique, delicious recipes with AI assistance
- **Recipe Management**: Save, view, and manage your generated recipe collection
- **Copy & Share**: Easy recipe copying and sharing functionality
- **Visual Recipe Cards**: Beautiful cards with ingredients and step-by-step instructions

### 🎯 **Platform Features**
- **Multi-App Interface**: Single platform for multiple AI applications
- **Seamless Navigation**: Easy switching between applications with back-to-home functionality
- **Responsive Design**: Perfect experience across desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Error Handling**: Robust error handling and user feedback
- **Scalable Architecture**: Easy to add new AI applications

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 14](https://nextjs.org/) with App Router |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **AI Integration** | [Google Gemini AI](https://ai.google.dev/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Forms** | [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup) |
| **Deployment** | [Vercel](https://vercel.com/) (Recommended) |

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Google Gemini API key** ([Get one here](https://ai.google.dev/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/diy-ai-hub.git
   cd diy-ai-hub
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

## 📁 Project Structure

```
diy-ai-hub/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Home page (app selection)
│   ├── travel-planner/           # Travel planner app
│   │   └── page.tsx
│   └── recipe-generator/         # Recipe generator app
│       └── page.tsx
├── components/                   # React components
│   ├── Header.tsx               # Navigation header
│   ├── Hero.tsx                 # Hero section
│   ├── Footer.tsx               # Footer component
│   ├── TravelPlannerForm.tsx    # Travel form component
│   ├── TripDetails.tsx          # Trip results display
│   └── ...
├── utils/                        # Utility functions
│   ├── gemini.ts                # Google Gemini AI integration
│   └── sanitizeRecipe.ts        # Recipe parsing utilities
├── lib/                         # Library files
│   ├── locations.ts             # Location data
│   └── usaCities.ts             # US cities data
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

The application uses Google's Gemini AI API for content generation. Make sure to:
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

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

### 🚀 **Upcoming Features**
- [ ] **Content Writer**: AI-powered content generation
- [ ] **Code Assistant**: Programming help and code generation
- [ ] **Image Generator**: AI image creation tools
- [ ] **User Authentication**: User accounts and data persistence
- [ ] **Social Features**: Recipe and trip sharing
- [ ] **Advanced Search**: Enhanced filtering and search capabilities
- [ ] **Mobile Apps**: Native iOS and Android applications

### 🔧 **Technical Improvements**
- [ ] **Performance Optimization**: Better loading times and caching
- [ ] **Offline Support**: Progressive Web App features
- [ ] **Internationalization**: Multi-language support
- [ ] **Advanced Analytics**: Usage tracking and insights
- [ ] **API Rate Limiting**: Better API usage management

## 📞 Support

If you have any questions or need help:

- **Create an issue** on GitHub
- **Check the documentation** in this README
- **Review existing issues** for solutions

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful AI capabilities
- **Next.js team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Open source community** for various libraries and tools

---

<div align="center">

**Made with ❤️ for AI enthusiasts worldwide**

[⭐ Star this repo](https://github.com/yourusername/diy-ai-hub) | [🐛 Report a bug](https://github.com/yourusername/diy-ai-hub/issues) | [💡 Request a feature](https://github.com/yourusername/diy-ai-hub/issues)

</div>
