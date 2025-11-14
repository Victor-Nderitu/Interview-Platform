# Interview-Platform
Full-stack interview platform with real-time video chat and collaborative coding
# 🚀 Full-Stack Interview Platform

A comprehensive MERN stack application designed for conducting technical interviews with real-time video chat, collaborative code editing, and automated feedback system.

![Interview Platform](https://img.shields.io/badge/React-18.2.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-22.20.0-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

## ✨ Features

### 🎯 Core Functionality
- **🧑‍💻 VSCode-Powered Code Editor** - Familiar coding environment
- **🎥 1-on-1 Video Interview Rooms** - Real-time video conferencing
- **🔐 Authentication via Clerk** - Secure user management
- **💬 Real-time Chat Messaging** - In-session communication
- **⚡ Live Code Execution** - Run code in isolated environments

### 🎨 User Experience
- **🧭 Dashboard with Live Stats** - Overview of sessions and activity
- **🔊 Mic & Camera Toggle** - Full media control
- **🖥️ Screen Sharing** - Share your screen during interviews
- **🎯 Auto Feedback System** - Success/Fail based on test cases
- **🎉 Confetti on Success** - Celebratory feedback
- **🔔 Notifications on Fail** - Immediate result feedback

### 🔧 Advanced Features
- **🔒 Room Locking** - Maximum 2 participants per session
- **🧠 Background Jobs with Inngest** - Async task processing
- **⚡ Data Fetching & Caching** - TanStack Query for optimal performance
- **🤖 CodeRabbit Integration** - PR analysis & code optimization
- **🧪 Secure Code Execution** - Isolated environment for code runs

## 🏗️ Architecture

```
interview-platform/
├── 📁 backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── controllers/        # Route handlers
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Auth & utility middleware
│   │   ├── lib/               # Configuration & utilities
│   │   └── server.js          # Entry point
│   └── package.json
│
└── 📁 frontend/               # React + Vite SPA
    ├── src/
    │   ├── components/        # Reusable UI components
    │   ├── pages/             # Route components
    │   ├── hooks/             # Custom React hooks
    │   ├── api/               # API service functions
    │   ├── lib/               # Utilities & configuration
    │   └── main.jsx           # Entry point
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Local or Atlas)
- **Accounts** for required services

### Required Services Setup

#### 1. 🔐 Clerk Authentication
```bash
# Sign up at https://clerk.dev
# Create a new application
# Copy publishable and secret keys
```

#### 2. 🎥 Stream Video & Chat
```bash
# Sign up at https://getstream.io
# Create Video & Audio application
# Get API Key and Secret
```

#### 3. ⚡ Inngest Background Jobs
```bash
# Sign up at https://inngest.com
# Create new application
# Get Event Key and Signing Key
```

### 📥 Installation

#### Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Environment configuration
cp .env.example .env
```

#### Backend Environment (.env)
```env
PORT=3000
NODE_ENV=development

# Database
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/interview-platform

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Stream Video & Chat
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_secret

# Inngest Background Jobs
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Client URL
CLIENT_URL=http://localhost:5173
```

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Environment configuration
cp .env.example .env
```

#### Frontend Environment (.env)
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:3000/api
VITE_STREAM_API_KEY=your_stream_api_key
```

### 🏃‍♂️ Running the Application

#### Start Backend Server
```bash
cd backend
npm run dev
# Server running on http://localhost:3000
```

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
# Application running on http://localhost:5173
```

## 🎮 Usage Guide

### 👤 User Authentication
1. **Sign Up**: Create account using email or social providers
2. **Dashboard**: Access after successful authentication
3. **Session Management**: Create, join, or view past sessions

### 🎪 Creating an Interview Session
1. **Click "Create Session"** on dashboard
2. **Select Problem & Difficulty**
3. **Configure Session Settings**
4. **Share Session URL** with participant

### 👥 Joining a Session
1. **Method A**: Click on active session in dashboard
2. **Method B**: Use direct session URL shared by host
3. **Auto-join**: Redirected to session room upon acceptance

### 💻 During the Interview
- **Video/Audio**: Toggle camera and microphone
- **Code Editor**: Collaborative coding in real-time
- **Chat**: Communicate via text messaging
- **Test Execution**: Run code against test cases
- **Screen Sharing**: Share your screen when needed

## 🔧 API Endpoints

### Sessions
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/sessions` | Create new session | ✅ |
| GET | `/api/sessions/active` | Get active sessions | ✅ |
| GET | `/api/sessions/my-recent` | Get user's recent sessions | ✅ |
| GET | `/api/sessions/:id` | Get session by ID | ✅ |
| POST | `/api/sessions/:id/join` | Join existing session | ✅ |
| POST | `/api/sessions/:id/end` | End session | ✅ |

### Chat & Video
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/chat/token` | Get Stream chat token | ✅ |

### Webhooks
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/webhooks/clerk` | Clerk user sync webhook |

## 🛠️ Development

### Code Structure
```javascript
// Frontend component structure
components/
├── CreateSessionModal.jsx    // Session creation dialog
├── WelcomeSection.jsx        // Dashboard header
├── ActiveSessions.jsx        // Live sessions list
├── RecentSessions.jsx        // Past sessions
├── StatsCards.jsx           // Dashboard metrics
└── Navbar.jsx               // Navigation header

// Backend controller structure
controllers/
├── sessionController.js      # Session CRUD operations
├── chatController.js         # Stream integration
└── webhookController.js      # Clerk webhook handler
```

### Adding New Features
1. **Backend**: Create route → controller → model
2. **Frontend**: Create page → components → API service
3. **Integration**: Connect frontend to backend endpoints

## 🚀 Deployment

### Backend Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Frontend Deployment
```bash
# Build optimized version
npm run build

# Preview production build
npm run preview
```

### Environment Variables for Production
```env
# Update these for production
CLIENT_URL=https://yourdomain.com
NODE_ENV=production
```

## 🐛 Troubleshooting

### Common Issues

#### 1. 🔑 Authentication Problems
```bash
# Check Clerk keys match between frontend/backend
# Verify CORS settings in backend
```

#### 2. 🎥 Video Not Working
```bash
# Verify Stream API keys
# Check browser permissions for camera/microphone
```

#### 3. 💾 Database Connection Issues
```bash
# Test MongoDB connection
node test-db.js
```

#### 4. 🔄 Webhook Failures
```bash
# Verify webhook secret matches Clerk dashboard
# Check webhook endpoint accessibility
```

### Debug Mode
Enable detailed logging by setting:
```env
NODE_ENV=development
DEBUG=true
```

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Code Standards
- **Frontend**: ESLint + Prettier configuration
- **Backend**: Consistent error handling
- **Commits**: Conventional commit messages
- **Documentation**: Update README for new features

## 📊 Performance

### Optimizations Implemented
- **Frontend**: React Query for efficient data caching
- **Backend**: Connection pooling for MongoDB
- **Assets**: Optimized bundle splitting
- **Real-time**: Efficient WebSocket management

### Monitoring
- **Backend**: Health check endpoint `/health`
- **Database**: Connection status monitoring
- **Performance**: Response time tracking

## 🛡️ Security

### Implemented Security Measures
- **Authentication**: Clerk-based secure auth
- **Authorization**: Route protection middleware
- **Data Validation**: Input sanitization
- **CORS**: Configured for specific origins
- **Environment Variables**: Sensitive data protection

### Security Best Practices
- Never commit sensitive keys to version control
- Use HTTPS in production
- Regular dependency updates
- Security headers implementation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- **Clerk** for authentication infrastructure
- **Stream** for video and chat capabilities
- **Inngest** for background job processing
- **TanStack** for data fetching utilities
- **Vite** for fast development build tooling


**Built with ❤️ for the developer community**
