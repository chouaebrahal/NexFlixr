# Nexflixr - Movie & TV Series Discovery Platform

A modern React application for discovering movies and TV series, built with React 19, TypeScript, and Tailwind CSS. The application integrates with the TMDB API to provide users with an engaging media browsing experience.

## 🚀 Features

- **Media Discovery**: Browse trending movies and TV shows
- **Advanced Search**: Comprehensive filtering options with multiple criteria
- **Interactive Cards**: Detailed views for each media item
- **Watchlist Functionality**: Add/remove items to your personal watchlist (persisted with localStorage)
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Custom Animation**: Smooth animations and transitions using Framer Motion
- **Dark/Light Mode**: Theme switching capability
- **Person Profiles**: Browse actors, directors, and other crew members
- **Detail Modals**: Comprehensive information for each media item

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (custom stores)
- **Animations**: Framer Motion
- **API Integration**: TMDB API
- **Routing**: React Router DOM
- **Testing**: Vitest for unit tests
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── sections/        # Layout sections
│   └── shared/          # Reusable components
├── store/              # Zustand stores
├── api/                # API service functions
├── lib/                # Utility functions and types
└── types/              # TypeScript type definitions
```

## 🏗️ Core Stores

- **useMediaStore**: Manages media content (trending, search results, details, pagination)
- **useModalStore**: Controls modal states and alert system
- **usePersonStore**: Handles person/actor data management
- **useThemeStore**: Manages dark/light theme preferences

## 🎨 Design

The UI/UX design was inspired by the [Movie & Series Website Community Figma design](https://www.figma.com/design/XFZ4irKbGvh9J3IhpLNZvn/Movie---Series-Website--Community-?node-id=0-1&p=f&t=xaL8FPATpZlOHQl9-0). The implementation follows modern design principles with a focus on user experience.

## 🧪 Testing

Started implementing unit tests with Vitest to learn and practice testing fundamentals. Basic tests cover:
- Simple components like Button and Loading
- Component rendering and user interactions
- Testing core functionality

## 🔧 Key Components

- **CardItem**: Interactive media cards with watchlist toggle
- **SectionRow**: Horizontal scrolling sections with animations
- **SearchableDropdown**: Custom dropdown with search functionality
- **AdvancedSearch**: Comprehensive filtering interface
- **Loading & Error**: Consistent loading and error states
- **DetailModal**: Detailed views for media items

## 🌐 API Integration

Integrates with TMDB (The Movie Database) API to fetch:
- Trending movies and TV shows
- Movie and TV show details
- Person/actor information
- Search results
- Genre information

## 📱 Responsive Features

- Mobile-first responsive design
- Custom horizontal scrolling with mouse wheel support
- Touch-friendly interactive elements
- Optimized for various screen sizes

## 🔄 Data Management

- API requests with proper loading/error states
- LocalStorage caching for watchlist persistence
- Comprehensive error handling with user feedback
- Pagination for infinite scroll functionality

## 🔐 Security & Privacy

- API keys stored in environment variables
- User data persistence through localStorage
- Secure API communication with TMDB

## ⚡ Performance Optimizations

- Image lazy loading
- Component memoization with React.memo
- Efficient state management with Zustand
- Optimized API requests

## 💡 Learning Journey

The project was developed over 12 days as part of a learning journey, implementing:
- React 19 features and best practices
- TypeScript type safety
- Modern state management with Zustand
- Animation and UI/UX principles
- Testing fundamentals with Vitest
- Component-based architecture

## 🔧 Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your TMDB API key:
   ```
   VITE_APP_TMDB_API_KEY=your_api_key_here
   ```
4. Start the development server: `npm run dev`

## 📝 Notes

- This project was developed primarily for learning purposes
- Testing is currently minimal but serves as a foundation for learning
- The design follows inspiration from the Figma community design
- All data comes from TMDB API and should be used in compliance with their terms

## 🎯 Future Improvements

- More comprehensive test coverage
- Additional accessibility features
- Enhanced search functionality
- User authentication and personalization
- Advanced filtering options
- Performance optimizations