---
title: "The MovieDB"
description: "A modern, full-featured movie, TV show and cast discovery application built with Next.js 16, React 19, and Tailwind CSS. Features comprehensive search, user authentication, personal lists, and advanced filtering with user details stored in PostgreSQL."
date: 2025-10-23
tech_stack:
  - "Next.js 16"
  - "React 19"
  - "TypeScript"
  - "Tailwind CSS 4"
  - "PostgreSQL"
  - "The Movie Database API"
  - "Radix UI"
demo_url: "https://tmdb-movie-listings.vercel.app/"
preview_image: "https://manjushsh.github.io/manjushsh/assets/images/featured/projects/moviedb.png"
status: "active"
featured: true
categories:
  - "Web Development"
  - "Full-Stack Development"
  - "API Integration"
  - "Database Design"
features:
  - "Browse trending, popular, and top-rated movies & TV shows"
  - "Detailed movie/TV pages with cast, crew, images, trailers, and reviews"
  - "Browse seasons and episodes for TV shows including upcoming episodes for seasons"
  - "User authentication with secure JWT-based sessions"
  - "Personal favorites and watchlist management"
  - "Advanced search and filtering capabilities"
  - "Responsive design with dark mode support"
  - "PostgreSQL database with migrations"
  - "SEO optimized with performance analytics"
  - "Progressive Web App (PWA) with offline support"
  - "Multi-language support (8 languages)"
  - "Streaming service availability with provider links"
  - "Video integration for trailers and clips"
---

## Project Overview

TMDB Movie Listings is a comprehensive, full-stack web application that provides users with an extensive platform to discover, explore, and manage movies and TV shows. Built with cutting-edge technologies including Next.js 16, React 19, it offers a rich, interactive experience with user authentication, personal lists, and advanced filtering capabilities.

## Key Features

### Content Discovery
- **Browse Content**: Trending, popular, top-rated movies and TV shows
- **Detailed Pages**: Comprehensive information with cast, crew, images, trailers, reviews, and similar content
- **Advanced Search**: Multi-criteria search with genre, year, rating filters
- **People Pages**: Detailed actor and crew member profiles with filmographies

### User Features
- **Authentication System**: Secure sign-up/sign-in with JWT-based sessions
- **Personal Lists**: Favorites and watchlist management with add/remove functionality
- **User Profiles**: Personalized user profile management
- **Cross-Device Sync**: User data synchronized across devices

### Technical Features
- **Responsive and Accessible Design**: Mobile-first design with dark mode support and accessibility considerations
- **Performance Optimized**: Fast loading with Next.js 16 optimizations and Vercel analytics
- **SEO Optimized**: Proper meta tags, structured data, and performance insights
- **Progressive Web App**: Service worker, offline support, and installable app experience
- **Internationalization**: Multi-language support with 8 locales (EN, DE, ES, FR, HI, IT, JA, ZH)
- **Streaming Integration**: Watch provider information with direct links to streaming services
- **Video Players**: Embedded trailers and video content for movies, TV shows (seasons and episodes including upcoming episodes)
- **Database Integration**: PostgreSQL backend for user data and application state

## Technical Implementation

### Frontend Architecture
- **Next.js 16 Framework**: App Router with server and client components for optimal performance
- **React 19**: Latest React features with enhanced concurrent rendering
- **TypeScript**: Full type safety across the entire application
- **Tailwind CSS 4**: Utility-first styling with modern design system
- **Radix UI Components**: Accessible, unstyled UI primitives for complex interactions

### Backend & Database
- **PostgreSQL Database**: Robust relational database for user data and application state
- **Database Migrations**: Version-controlled schema changes with migration scripts
- **API Routes**: RESTful endpoints for authentication, user management, and data operations
- **JWT Authentication**: Secure token-based authentication with Jose library

### API Integration & Performance
- **TMDB API Integration**: Comprehensive integration with The Movie Database API
- **API Load Balancing**: Multiple API keys for improved reliability and rate limiting
- **Error Handling**: Robust error boundaries and graceful degradation
- **Caching Strategies**: Optimized data fetching with Next.js caching
- **Performance Monitoring**: Vercel Analytics and Speed Insights integration

### UI/UX Features
- **Interactive Components**: Carousels (Embla), dialogs, tooltips, and form components
- **Form Management**: React Hook Form with Zod validation for type-safe forms
- **Theme System**: Dark/light mode support with next-themes
- **Toast Notifications**: User feedback with Sonner toast library
- **Responsive Grid Layouts**: CSS Grid and Flexbox for adaptive layouts

## Development Highlights

### Modern Stack Integration
The application showcases the latest web development technologies including Next.js 16's App Router, React 19's enhanced features, and Tailwind CSS 4's new capabilities. The integration demonstrates best practices for modern full-stack development.

### Database Architecture
Implemented a robust PostgreSQL database schema with proper migration scripts, enabling scalable user management, favorites, and watchlist functionality. The database design supports future feature expansions.

### Authentication & Security
Built a secure authentication system using JWT tokens with the Jose library, providing session management, protected routes, and user data security. The system includes proper error handling and validation.

### Performance & User Experience
Created an exceptional user experience with responsive design, dark mode support, interactive UI components, and optimized loading patterns. Special attention was paid to accessibility and mobile-first design principles.

### API Architecture
Developed a comprehensive API layer with multiple endpoints for authentication, content discovery, user management, and debugging. Implemented load balancing with multiple TMDB API keys for enhanced reliability.

## Future Enhancements

- Advanced filtering with more granular options (director, production company, etc.)
- Movie recommendation engine based on user preferences
- User-generated content features (custom lists, reviews)
- Social features for user reviews and ratings (friends, followers with moderation)
- Advanced PWA features like background sync and push notifications
- Enhanced analytics and user insights dashboard
- Integration with real-time streaming service APIs for direct playback
- Enhanced video player with quality controls and subtitles
