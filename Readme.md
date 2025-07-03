# CryptoTest-BU

A comprehensive test project consisting of Frontend and Backend assessments, demonstrating skills in UI development, responsive design, and API integration.

## Table of Contents

-   [Project Overview](#project-overview)
-   [Frontend Test](#frontend-test)
    -   [Features](#frontend-features)
    -   [Tech Stack](#frontend-tech-stack)
    -   [Pages](#frontend-pages)
    -   [Deployment](#frontend-deployment)
-   [Backend Test](#backend-test)
    -   [Features](#backend-features)
    -   [Tech Stack](#backend-tech-stack)
    -   [API Endpoints](#api-endpoints)
    -   [Deployment](#backend-deployment)
-   [Installation](#installation)
-   [Contact](#contact)

## Project Overview

This project consists of two main assessments:

1. **Frontend Test**: Focused on UI development and responsive design for crypto data visualization
2. **Backend Test**: Full-stack implementation with API development and data integration

## Frontend Test

### Frontend Features

-   Fully responsive design (mobile, tablet, laptop, desktop)
-   Clean and modern UI implementation
-   Interactive crypto charts using dummy data
-   Focus on code organization and maintainability
-   Pixel-perfect implementation

### Frontend Tech Stack

-   **Framework**: React.js with Vite.js
-   **Styling**: Tailwind CSS 4
-   **UI Components**: Ant Design (Antd)
-   **Data Visualization**: React Google Chart
-   **State Management**: React Context API
-   **Routing**: React Router
-   **Deployment**: Hostinger

### Frontend Pages

1. **Home Page (`/`)**

    - Overview of crypto market trends
    - Featured cryptocurrency charts
    - Responsive layout with adaptive components

2. **BTC/IDR Page (`/btc-idr`)**
    - Detailed BTC to IDR conversion data
    - Historical price charts
    - Responsive data tables

### Frontend Deployment

Live demo available at: [https://crypto-fe.febriansyah.web.id](https://crypto-fe.febriansyah.web.id)  
_(Note: Link will be updated to actual deployment URL)_

## Backend Test

### Backend Features

-   RESTful API implementation
-   MySQL database integration
-   Comprehensive dashboard analytics
-   Filterable data endpoints
-   CORS enabled for testing
-   Responsive admin interface

### Backend Tech Stack

#### Frontend (Admin Panel)

-   **Framework**: React.js with Vite.js
-   **Styling**: Tailwind CSS
-   **Data Fetching**: TanStack Query (React Query)
-   **UI Components**: Ant Design (Antd)
-   **Charts**: React Google Chart
-   **Deployment**: Hostinger

#### Backend (API)

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MySQL
-   **Hosting**: Vercel

### API Endpoints

1. **Members Data**

    - `GET /api/v1/members` - List all members

2. **Deposits Data**

    - `GET /api/v1/deposits` - List all deposits

3. **Dashboard Charts**

    - `GET /api/v1/dashboard/chart/deposit` - Deposit chart data (filterable by month/year)
    - `GET /api/v1/dashboard/chart/registration` - Registration chart data (filterable by month/year)

4. **Dashboard Summary**
    - `GET /api/v1/dashboard/summary` - Comprehensive dashboard metrics (filterable by month/year)

### Backend Deployment

**API Base URL**: [https://api-crypto-bu.vercel.app/](https://api-crypto-bu.vercel.app/)  
**Admin Panel**: [https://crypto-be.febriansyah.web.id](https://crypto-be.febriansyah.web.id)

## Installation

### Frontend Setup

```bash
# Clone repository
git clone https://github.com/yourusername/CryptoTest-BU.git

# Navigate to frontend directory
cd CryptoTest-BU/frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to backend directory
cd CryptoTest-BU/backend

# Install dependencies
npm install

# Create .env file and configure database
cp .env.example .env

# Start development server
npm run start
```

## Contact

For any inquiries about this project, please contact:

**Email**: [mailto:arif@febriansyah.web.id](mailto:arif@febriansyah.web.id)  
**LinkedIn**: [https://www.linkedin.com/in/ariffebri/](https://www.linkedin.com/in/ariffebri/)
**Website**: [https://febriansyah.web.id](https://febriansyah.web.id)
