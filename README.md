
Feedback Portal
A comprehensive feedback management system built with Next.js, NextAuth.js, and Prisma.

Project Overview
This feedback portal allows users to submit and track feedback, while administrators can review and manage all feedback submissions. The application features role-based access control, authentication, and a responsive user interface.

Features
Authentication System: Secure login and registration with NextAuth.js
Role-Based Access Control: Different experiences for users and administrators
Feedback Submission: Users can submit detailed feedback with titles and descriptions
Feedback Management: Administrators can view, filter, and update the status of feedback
Responsive Design: Built with Tailwind CSS for a beautiful experience on all devices
Tech Stack
Framework: Next.js 13+ (App Router)
Authentication: NextAuth.js
Database ORM: Prisma
Styling: Tailwind CSS
Database: MongoDB (via Prisma)
Getting Started
Prerequisites
Node.js 16.8 or later
MongoDB database (local or cloud-hosted)
Environment Setup
Create a .env.local file in the root directory with the following variables:
DATABASE_URL="your-mongodb-connection-string"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secure-secret-here"

Installation
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run the development server
npm run dev
Open http://localhost:3000 with your browser to see the result.

Project Structure
/app                  # App Router pages and API routes
  /admin              # Admin-specific pages
  /api                # API endpoints
    /auth             # Authentication API
    /feedback         # Feedback API
  /feedback           # Feedback submission pages
  /signin             # Authentication pages
  /signup             # User registration
/components           # Reusable UI components
/prisma               # Database schema and client
/public               # Static assets
Authentication
The application uses NextAuth.js with a custom credentials provider. Users can register with a username, email, and password, and are assigned a role (user/admin).

API Routes
POST /api/auth/signup: Create a new user account
POST /api/feedback: Submit new feedback
GET /api/feedback: Retrieve feedback for the current user
GET /api/admin/feedback: Admin-only endpoint to retrieve all feedback
Database Schema
Key models in the database:

User: Stores user accounts with authentication details
Feedback: Stores feedback submissions linked to users
Learn More
To understand more about the technologies used:

Next.js Documentation
NextAuth.js Documentation
Prisma Documentation
Tailwind CSS Documentation
Deployment
Deploy this application using:

Vercel (recommended for Next.js projects)
Any platform supporting Node.js applications
License