# AI Builder - Full Stack Web Development Platform

## Overview

AI Builder is a comprehensive web development platform that provides interactive learning paths and code generation tools for frontend, backend, and database development. The application features a gamified learning system with skill trees and progress tracking, combined with AI-assisted code generation capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React 18 with TypeScript and follows a modern component-based architecture:

- **UI Framework**: React with TypeScript for type safety and developer experience
- **Component Library**: shadcn/ui built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Context for authentication state and TanStack Query for server state
- **Form Handling**: React Hook Form with Zod validation for type-safe forms
- **Build Tool**: Vite for fast development and optimized production builds

The application uses a section-based navigation system where users can switch between different learning paths (Frontend, Backend, Database, Learn) without full page reloads.

### Backend Architecture
The backend follows a RESTful API design using Express.js with TypeScript:

- **Runtime**: Node.js with Express.js framework
- **API Design**: RESTful endpoints with consistent error handling and logging middleware
- **Authentication**: Password-based authentication using bcrypt for hashing
- **Storage Interface**: Abstracted storage layer (IStorage) allowing for different implementations
- **Development**: In-memory storage for development, designed to be easily swapped for database implementations
- **Middleware**: Custom logging middleware for API request tracking and error handling

The server includes middleware for request logging, JSON parsing, and comprehensive error handling with proper HTTP status codes.

### Data Storage Solutions
The application uses a flexible storage architecture that supports both development and production environments:

- **Development**: In-memory storage using Maps for rapid prototyping and testing
- **Production Ready**: Drizzle ORM configured for PostgreSQL with schema definitions
- **Database Schema**: User management with progress tracking system
- **Schema Design**: Includes users table with authentication fields and user_progress table for skill tracking
- **Migrations**: Drizzle Kit for database schema management and migrations

The storage interface abstracts database operations, making it easy to switch between different storage implementations.

### Authentication and Authorization
Simple password-based authentication system:

- **Registration**: Email/password registration with duplicate email prevention
- **Login**: Email/password authentication with secure password comparison
- **Password Security**: bcrypt hashing with salt rounds for secure password storage
- **Client State**: React Context for maintaining authentication state across components
- **Session Management**: Prepared for session-based authentication (session store dependencies included)

The authentication system is designed to be extended with additional features like JWT tokens or session management.

### Component Architecture
The application follows a modular component structure:

- **Reusable UI Components**: Built on shadcn/ui component library with consistent theming
- **Feature Components**: Specialized components for each learning section (Frontend, Backend, Database)
- **Modal System**: Login and signup modals with form validation and error handling
- **Responsive Design**: Mobile-first approach with responsive navigation and layouts

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Icon library for consistent iconography
- **Font Awesome**: Additional icon library for specialized icons

### Development and Build Tools
- **Vite**: Fast build tool with HMR and optimized production builds
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundler for server-side code
- **PostCSS**: CSS processing with Tailwind CSS integration

### Database and ORM
- **Drizzle ORM**: Type-safe SQL ORM for PostgreSQL
- **Neon Database**: Serverless PostgreSQL for production deployment
- **Drizzle Kit**: Database migration and schema management tools

### Backend Dependencies
- **Express.js**: Web application framework for Node.js
- **bcrypt**: Password hashing library for secure authentication
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### State Management and Data Fetching
- **TanStack Query**: Powerful data synchronization for React applications
- **React Hook Form**: Performant, flexible forms with minimal re-renders
- **Zod**: TypeScript-first schema validation library

### Development Tools
- **Replit Integration**: Vite plugins for Replit development environment
- **Runtime Error Overlay**: Enhanced error handling in development
- **Dev Banner**: Development environment indicators