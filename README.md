# ShopScore - Store Rating Platform

A full-stack web application built for the **FullStack Intern Coding Challenge**. It allows users to browse stores, submit ratings, and manage the platform via role-based access control.

## Tech Stack
- **Backend:** ExpressJs (Node.js) + Prisma ORM
- **Database:** PostgreSQL
- **Frontend:** ReactJs (Vite) + Tailwind CSS

## Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running locally

## Local Setup Instructions

### 1. Database Setup
Ensure PostgreSQL is running on your machine.
Create a .env file inside the ackend directory based on the .env.example file (or just create it directly):
\\\env
DATABASE_URL="postgresql://postgres:password@localhost:5432/roxiler_ratings?schema=public"
JWT_SECRET="your_secret_key"
PORT=5000
\\\
*(Update the DATABASE_URL with your local postgres username and password)*

### 2. Backend Setup
Open a terminal in the ackend folder:
\\\ash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
\\\

**Note on Database State:** The source code does not include my personal database data. However, running 
px prisma db seed will automatically populate your local database with a System Administrator, Store Owners, Stores, and sample ratings so you can immediately test all role functionalities!

### 3. Frontend Setup
Open a second terminal in the rontend folder:
\\\ash
cd frontend
npm install
npm run dev
\\\

## Default Login Credentials (from Seed)
You can use these credentials to test the role-based dashboards:

**System Administrator:**
- **Email:** dmin@storeratings.io
- **Password:** Admin@1234

**Store Owner:**
- **Email:** julian@artisancoffee.co
- **Password:** Owner@1234

**Normal User:**
- You can create a new user via the Registration page, or use:
- **Email:** sanika@gmail.com
- **Password:** User@1234

## Features Implemented
- **System Admin:** Add stores, users, and admins. Dashboard metrics, advanced table sorting, filtering, and detailed user/store metrics viewing.
- **Store Owner:** Track customer sentiment, see store average rating, total ratings, and customer breakdown.
- **Normal User:** Register, discover stores, search, filter, and submit/modify 1-5 star ratings.
- **Security:** JWT Authentication, Bcrypt password hashing, and strict form validations (Regex emails, complex passwords, max length addresses).
