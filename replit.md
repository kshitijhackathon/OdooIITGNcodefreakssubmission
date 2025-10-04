# Expense Management Web Application

## Overview

This is a modern expense management web application built with React, Express, and PostgreSQL. The application enables employees to submit expenses, managers to review and approve/reject them, and administrators to configure approval rules. It features a productivity-focused design inspired by Linear and Notion, with support for OCR receipt scanning, multi-currency handling, and flexible approval workflows.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool for fast development and optimized production builds
- Wouter for lightweight client-side routing instead of React Router

**UI Component System**
- Shadcn/ui component library with Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for managing component variants
- Custom theme system supporting light/dark modes with CSS variables

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management, caching, and API interactions
- Local storage for authentication state persistence
- React context for theme management

**Design System**
- Custom color palette defined in CSS variables for consistent theming
- Typography using Inter font for UI elements and JetBrains Mono for monospace content
- Productivity-focused design with emphasis on clarity and data readability
- Comprehensive component library including cards, tables, forms, modals, and status badges

**Key Pages & Features**
- Login/Signup: Authentication with role selection (employee, manager, admin)
- Dashboard: Overview with statistics, recent expenses, and quick actions
- Employee View: Expense submission form, personal expense list with filtering
- Manager View: Approval workflow with expense cards and comment functionality
- Rules Configuration: Admin interface for setting up approval rules (percentage-based, specific approver, hybrid)
- OCR Simulation: Receipt upload with mock data extraction

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- Development middleware for Vite integration with HMR support
- Custom logging middleware for API request tracking
- Error handling middleware for consistent error responses

**Storage Layer**
- In-memory storage implementation (MemStorage) for development/testing
- Interface-based storage design (IStorage) for easy swapping with database implementations
- CRUD operations abstracted behind storage interface

**API Design**
- RESTful API structure with `/api` prefix for all backend routes
- Separation of concerns with routes defined in `server/routes.ts`
- Storage operations in `server/storage.ts`

### Data Storage Solutions

**Database Schema** (Drizzle ORM with PostgreSQL)
- **Users Table**: Stores user information including name, email, password, role, and preferred currency
- **Expenses Table**: Tracks expense submissions with amount, currency, category, description, date, status, receipt URL, and approval metadata
- **Approval Rules Table**: Defines configurable approval workflows with rule types (percentage, specific approver), thresholds, and category filters

**ORM & Migrations**
- Drizzle ORM for type-safe database queries and schema definitions
- Drizzle Kit for database migrations and schema management
- Zod integration for runtime validation of database operations
- Connection to Neon Database (serverless PostgreSQL)

**Data Validation**
- Schema-based validation using Drizzle Zod
- Type-safe insert schemas generated from database schema
- Shared types between frontend and backend via `shared/schema.ts`

### Authentication and Authorization

**Current Implementation**
- Mock authentication using localStorage for user session management
- Role-based access control with three roles: employee, manager, admin
- Client-side route protection checking for authenticated user

**Planned Implementation** (Based on package dependencies)
- Session-based authentication with connect-pg-simple for PostgreSQL session storage
- Password hashing (likely bcrypt, though not explicitly in visible dependencies)
- Server-side session validation for API endpoints

### External Dependencies

**UI & Component Libraries**
- @radix-ui/* (20+ components): Accessible, unstyled primitives for building the UI
- cmdk: Command menu component for quick actions
- date-fns: Date formatting and manipulation
- lucide-react: Icon library for consistent iconography
- embla-carousel-react: Carousel/slider functionality
- vaul: Drawer component library

**Form Management**
- react-hook-form: Performant form handling with validation
- @hookform/resolvers: Validation resolver integration
- zod: Schema validation for forms and API data

**Database & Backend**
- @neondatabase/serverless: Serverless PostgreSQL client optimized for edge functions
- drizzle-orm: TypeScript ORM for PostgreSQL
- drizzle-zod: Integration between Drizzle schemas and Zod validation
- connect-pg-simple: PostgreSQL session store for Express sessions

**Development Tools**
- @replit/vite-plugin-*: Replit-specific Vite plugins for development experience
- TypeScript: Type safety across the entire codebase
- ESBuild: Fast JavaScript bundling for production builds

**Styling**
- Tailwind CSS: Utility-first CSS framework
- tailwind-merge: Utility for merging Tailwind classes
- clsx: Conditional class name composition
- class-variance-authority: Type-safe component variant management

**Key Integration Points**
- Multi-currency support with configurable user preferences
- OCR integration point for receipt scanning (currently simulated, ready for API integration)
- Approval rule engine for flexible expense approval workflows
- File upload handling for receipt attachments