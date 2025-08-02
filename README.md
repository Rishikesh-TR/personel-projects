**City Resilience Web Application**

This document provides an overview, installation guide, and usage instructions for the City Resilience web application. Whether you're cloning from GitHub or working locally, follow the steps below to set up, run, and maintain the application.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Repository Structure](#repository-structure)
4. [Environment Variables](#environment-variables)
5. [Installation and Setup](#installation-and-setup)
6. [Running in Development](#running-in-development)
7. [Building for Production](#building-for-production)
8. [Starting the Production Server](#starting-the-production-server)
9. [API Endpoints](#api-endpoints)
10. [Database](#database)
11. [File Uploads](#file-uploads)
12. [Key Features](#key-features)
13. [Troubleshooting](#troubleshooting)

---

## 1. Project Overview

The City Resilience web application is a full-stack platform to:

* Manage projects related to urban resilience
* Run simulations and compliance checks
* View interactive maps powered by Mapbox
* Authenticate users and secure routes

The front end is built with Vite and modern TypeScript, while the back end uses Express.js and SQLite via Sequelize.

## 2. Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Node.js** (v16 or higher) and **npm**
* **Git** for version control
* **Mapbox Account** to obtain an access token

## 3. Repository Structure

```text
project/
├── .bolt/               # Bolt-specific configuration
├── dist/                # Production build output (after `npm run build`)
├── dist_server/         # (empty placeholder)
├── server/              # Back-end source code
│   ├── middleware/      # Express middleware modules
│   ├── models/          # Sequelize models (SQLite DB)
│   ├── routes/          # API route handlers
│   ├── uploads/         # Uploaded files (images, data)
│   ├── index.js         # Express entry point
│   └── package.json     # Server dependencies and scripts
├── src/                 # Front-end source code
│   ├── assets/          # Static assets
│   └── ...              # Vite app files
├── .env.example         # Sample environment variables file
├── package.json         # Root dependencies & scripts
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS config
└── README.md            # (This file)
```

## 4. Environment Variables

Copy `.env.example` to `.env` in the root of the project (same level as `package.json`) and update the values:

```ini
NODE_ENV=development
PORT=5000
DATABASE_URL=sqlite:./database.sqlite
JWT_SECRET=your-secure-jwt-key
FRONTEND_URL=http://localhost:5173
MAPBOX_ACCESS_TOKEN=your-mapbox-token-here
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./server/uploads
# Optional external APIs
NDMA_API_KEY=your-ndma-api-key
GOOGLE_EARTH_ENGINE_KEY=your-google-earth-engine-key
```

* **JWT\_SECRET**: Generate a strong random string for production.
* **MAPBOX\_ACCESS\_TOKEN**: Obtain from your Mapbox account.

## 5. Installation and Setup

1. Clone the repository:

   ```bash
   ```

git clone [https://github.com/](https://github.com/)<username>/city-resilience-app.git
cd city-resilience-app

````

2. Install dependencies (root `package.json` will install both client and server deps):

```bash
npm install
````

3. Ensure `.env` is present and configured.

## 6. Running in Development

To start both server and client simultaneously:

```bash
npm run dev:full
```

* **Server**: Runs on `http://localhost:5000`
* **Client**: Runs on `http://localhost:5173`

You can also run them separately:

* `npm run dev` — front-end only
* `npm run dev:server` — back-end only

## 7. Building for Production

To build the front end for production:

```bash
npm run build
```

The output will be in the `dist/` directory.

## 8. Starting the Production Server

After building:

```bash
npm run start
```

This will run the Express server in production mode (`NODE_ENV=production`) and serve the API.

> **Note:** If you want to serve front-end static files from the server, you can configure Express to serve `dist/` as static assets.

## 9. API Endpoints

| Method | Path                       | Description                         |
| ------ | -------------------------- | ----------------------------------- |
| POST   | `/api/auth/register`       | Register a new user                 |
| POST   | `/api/auth/login`          | Log in and obtain a JWT token       |
| GET    | `/api/projects`            | List all projects                   |
| POST   | `/api/projects`            | Create a new project                |
| GET    | `/api/projects/:id`        | Get details of a specific project   |
| PUT    | `/api/projects/:id`        | Update project                      |
| DELETE | `/api/projects/:id`        | Delete project                      |
| GET    | `/api/simulations/:projId` | List simulations for a project      |
| POST   | `/api/simulations/:projId` | Create a simulation                 |
| GET    | `/api/compliance/:projId`  | Run compliance checks for a project |
| GET    | `/api/maps`                | Fetch map features (requires token) |

## 10. Database

* Powered by SQLite via Sequelize.
* The database file is created at `database.sqlite` in the project root.
* No external database setup is required.

## 11. File Uploads

* Uploaded files (e.g., map shapefiles, images) are stored in `server/uploads`.
* Maximum file size is configured via `MAX_FILE_SIZE` in `.env`.

## 12. Key Features

* **User Authentication** with JWT
* **Project Management** (create, read, update, delete)
* **Simulations**: Run and view results
* **Compliance Checks**: Automated reports
* **Interactive Maps**: Visualize city data via Mapbox

## 13. Troubleshooting

* **Port Conflicts**: Ensure ports 5000 and 5173 are free or update in `.env`.
* **Environment Variables**: Missing `MAPBOX_ACCESS_TOKEN` will break map functionality.
* **Database Errors**: Delete `database.sqlite` and let Sequelize recreate it if schema changes.

---

*Documentation generated on July 27, 2025.*
