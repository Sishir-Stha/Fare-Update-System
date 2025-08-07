# Flight Operations Control (FOC) System

This repository contains a full-stack Flight Operations Control (FOC) system, consisting of a Spring Boot backend API and a React frontend. The system is designed to manage flight operations, fare information, and user authentication.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Project Structure](#project-structure)
-   [Setup and Installation](#setup-and-installation)
    -   [Prerequisites](#prerequisites)
    -   [Backend Setup](#backend-setup)
    -   [Frontend Setup](#frontend-setup)
-   [Usage](#usage)
-   [API Endpoints](#api-endpoints)
-   [Authentication](#authentication)
-   [Contributing](#contributing)
-   [License](#license)

## Features

The Flight Operations Control System application provides the following key features:

**Backend (foc_api):**
-   User authentication and authorization (JWT-based).
-   User management.
-   Flight information management (FIS).
-   Fare management (CRUD operations for fares).
-   Data persistence using Microsoft SQL Server.
-   RESTful API endpoints for frontend communication.

**Frontend (foc_project):**
-   User login and dashboard.
-   Landing page.
-   Display of flight and fare information.
-   Integration with backend API for data operations.
-   Basic styling with Bootstrap.

## Technologies Used

**Backend (foc_api):**
-   Java 17
-   Spring Boot (Web, Data JPA)
-   Microsoft SQL Server JDBC Driver
-   JWT (JSON Web Tokens) for authentication
-   Lombok
-   Maven

**Frontend (foc_project):**
-   React 19
-   TypeScript
-   Vite
-   Axios for API communication
-   React Router DOM for navigation
-   Bootstrap for styling
-   ESLint for code quality

## Project Structure

The repository contains two main components:

```
.
├── New folder@FIS/          # Backend API (likely the main API)
│   └── New folder/
│       └── foc_api/
│           └── foc_api/     # Spring Boot Backend API
│               ├── src/
│               │   ├── main/
│               │   │   ├── java/com/foc/sishir/fare_Api/
│               │   │   │   ├── Controllers/   # REST API controllers (Fare, FIS, User, JWT)
│               │   │   │   ├── Entities/      # JPA Entities and request/response models
│               │   │   │   ├── Repositories/  # Spring Data JPA repositories
│               │   │   │   └── Services/      # Business logic services
│               │   │   └── resources/         # Application properties, SSL certificate
│               ├── pom.xml                    # Maven project file
│               └── ...
├── frontend_avantik/        # Frontend Application (likely the main frontend)
│   ├── frontend/
│       └── APPLEreact/
│           └── React front end/
│               └── foc_project/ # React Frontend Application
│                   ├── public/          # Static assets (images, favicon, vite svg)
│                   ├── src/
│                   │   ├── api/         # API client definitions
│                   │   ├── pages/       # Application pages (Dashboard, LandingPage, Login)
│                   │   ├── App.tsx      # Main application component
│                   │   ├── main.tsx     # Entry point
│                   │   └── ...
│                   ├── index.html
│                   ├── package.json     # Node.js dependencies and scripts
│                   ├── tsconfig.json    # TypeScript configuration
│                   ├── vite.config.ts   # Vite configuration
│                   └── ...
├── README.txt               # Root level README (this file)
└── ...
```

## Setup and Installation

Follow these steps to set up and run the Flight Operations Control System application locally.

### Prerequisites

-   Java Development Kit (JDK) 17 or higher
-   Maven
-   Node.js (LTS version recommended)
-   npm or Yarn
-   Microsoft SQL Server database

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd "New folder@FIS/New folder/foc_api/foc_api"
    ```

2.  **Configure SQL Server:**
    -   Ensure your SQL Server instance is running and accessible.
    -   Update `src/main/resources/application.properties` with your database connection details:
        ```properties
        spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=your_database_name;encrypt=true;trustServerCertificate=true;
        spring.datasource.username=your_username
        spring.datasource.password=your_password
        spring.jpa.hibernate.ddl-auto=update
        spring.jpa.show-sql=true
        ```
        *(Adjust `localhost:1433` and `databaseName` as per your SQL Server setup.)*

3.  **Build and run the backend:**
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```
    The backend API will start on `http://localhost:8080` by default.

### Frontend Setup

1.  **Navigate to the frontend directory (in a new terminal):**
    ```bash
    cd "frontend_avantik/frontend/APPLEreact/React front end/foc_project"
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

3.  **Start the frontend development server:**
    ```bash
    npm run dev
    # or yarn dev
    ```
    The frontend application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

Once both the backend and frontend servers are running:
1.  Open your web browser and navigate to `http://localhost:5173`.
2.  Log in using valid credentials (you might need to register users via the API if no registration endpoint is exposed on the frontend).
3.  Explore the dashboard and other pages to view flight and fare information.

## API Endpoints

The backend API exposes RESTful endpoints for managing users, flight information, and fare data. Key endpoint categories include:

-   `/api/auth`: User authentication (login).
-   `/api/users`: User-related operations.
-   `/api/fis`: Flight information management.
-   `/api/fare`: Fare management.

Detailed API documentation can be inferred from the `Controllers` and `Entities` classes in the backend.

## Authentication

The application uses JWT (JSON Web Tokens) for secure authentication. Upon successful login, a JWT is issued to the client, which must be included in the `Authorization` header of subsequent API requests.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

