# CityResilience Masterplan - Desktop Application

A comprehensive desktop application for urban planners, architects, and government officials to redesign cities with disaster-resilient infrastructure and eco-friendly upgrades.

## Features

### 🏗️ Core Functionality
- **Interactive City Editor**: Drag-and-drop tools for infrastructure modification
- **Disaster Simulation**: Test resilience against earthquakes, floods, tsunamis, and heatwaves
- **Compliance Checker**: Verify designs against IS 1893, NBC 2016, and other standards
- **Eco-Infrastructure Planning**: Solar panel placement, green spaces, pedestrian zones
- **Project Management**: Multi-project support with team collaboration

### 🎨 Desktop-Optimized Design
- **Large Screen Layout**: Optimized for desktop monitors (1920x1080+)
- **Professional Interface**: Clean, modern design inspired by CAD software
- **Keyboard Shortcuts**: Efficient workflow for power users
- **Multi-Panel Layout**: Simultaneous viewing of maps, properties, and tools

### 🔧 Technical Stack
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + SQLite
- **Maps**: Mapbox GL JS for interactive mapping
- **Authentication**: JWT-based secure authentication
- **Database**: SQLite with Sequelize ORM

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/city-resilience-masterplan.git
cd city-resilience-masterplan
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

Required environment variables:
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:5173
MAPBOX_ACCESS_TOKEN=your-mapbox-access-token
```

### 4. Database Setup
```bash
# Database will be automatically created on first run
# SQLite file will be created at: server/database.sqlite
```

### 5. Start Development Servers
```bash
# Start both frontend and backend
npm run dev:full

# Or start separately:
# Backend: npm run dev:server
# Frontend: npm run dev
```

### 6. Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

## GitHub Repository Setup

### 1. Create GitHub Repository
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: CityResilience Masterplan desktop application"

# Add remote origin (replace with your repository URL)
git remote add origin https://github.com/yourusername/city-resilience-masterplan.git

# Push to GitHub
git push -u origin main
```

### 2. Repository Structure
```
city-resilience-masterplan/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Application pages
│   ├── services/          # API services
│   ├── contexts/          # React contexts
│   └── types/             # TypeScript definitions
├── server/                # Backend Node.js application
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   └── uploads/           # File uploads directory
├── public/                # Static assets
├── dist/                  # Production build output
└── docs/                  # Documentation
```

### 3. GitHub Actions (Optional)
Create `.github/workflows/ci.yml` for automated testing:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: |
        npm install
        cd server && npm install
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build
```

## Production Deployment

### 1. Build Application
```bash
# Build frontend
npm run build

# Prepare server
npm run build:server
```

### 2. Environment Variables
Set production environment variables:
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-production-jwt-secret
FRONTEND_URL=https://yourdomain.com
MAPBOX_ACCESS_TOKEN=your-mapbox-token
```

### 3. Start Production Server
```bash
npm start
```

## Desktop-Specific Features

### Optimized for Large Screens
- **Minimum Resolution**: 1366x768
- **Recommended**: 1920x1080 or higher
- **Multi-monitor Support**: Drag panels to secondary monitors

### Keyboard Shortcuts
- `Ctrl + N`: New Project
- `Ctrl + S`: Save Project
- `Ctrl + Z`: Undo
- `Ctrl + Y`: Redo
- `Space`: Pan mode
- `Esc`: Cancel current tool

### Performance Optimizations
- **Efficient Rendering**: Optimized for desktop GPUs
- **Large Dataset Handling**: Virtualized lists for large projects
- **Memory Management**: Automatic cleanup of unused resources

## API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Project Endpoints
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Simulation Endpoints
- `POST /api/simulations` - Run disaster simulation
- `GET /api/simulations/:id` - Get simulation results

### Compliance Endpoints
- `POST /api/compliance` - Run compliance check
- `GET /api/compliance/:id` - Get compliance results

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Email: support@cityresilience.com
- Documentation: https://docs.cityresilience.com

## Roadmap

### Phase 1 (Current)
- ✅ Basic project management
- ✅ Interactive map editor
- ✅ Disaster simulations
- ✅ Compliance checking

### Phase 2 (Next)
- 🔄 Advanced 3D visualization
- 🔄 AI-powered design suggestions
- 🔄 Real-time collaboration
- 🔄 Mobile companion app

### Phase 3 (Future)
- 📋 Integration with CAD software
- 📋 Government approval workflows
- 📋 Citizen feedback portal
- 📋 IoT sensor integration