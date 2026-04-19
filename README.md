# Milking Tracker Backend

A clean, interview-friendly Node.js + Express + TypeScript + MongoDB backend for tracking milking sessions.

## 🚀 Features

- **Session Management**: Create, read, update, and delete milking sessions
- **Status Tracking**: Active → Completed → Abandoned (automated cleanup)
- **Data Validation**: Zod schemas for request integrity
- **Security**: Helmet middleware for protection
- **Logging**: Morgan + custom logger utility
- **Database**: MongoDB with Mongoose ODM
- **Automation**: Cron job for session cleanup
- **Error Handling**: TypeScript-safe with proper type guards

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api/sessions
```

### 1. Create Session
```http
POST /api/sessions
Content-Type: application/json

Request Body:
{
  "start_time": "2024-01-01T10:00:00Z"
}

Response:
{
  "success": true,
  "data": {
    "_id": "...",
    "start_time": "2024-01-01T10:00:00.000Z",
    "status": "active",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### 2. Get All Sessions
```http
GET /api/sessions

Response:
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "start_time": "...",
      "end_time": "...",
      "duration": 1234,
      "milk_quantity": 15.5,
      "notes": "Good session",
      "status": "completed",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### 3. Get Session Summary
```http
GET /api/sessions/summary

Response:
{
  "success": true,
  "data": {
    "totalSessions": 10,
    "totalMilk": 155.5,
    "avgMilk": 15.55
  }
}
```

### 4. End Session
```http
PATCH /api/sessions/:id/end
Content-Type: application/json

Request Body:
{
  "milk_quantity": 9.6,
  "notes": "was a good session"
}

Response:
{
  "success": true,
  "data": {
    "_id": "...",
    "start_time": "...",
    "end_time": "2024-01-01T10:15:30.000Z",
    "duration": 930,
    "milk_quantity": 9.6,
    "notes": "was a good session",
    "status": "completed",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Zod** - Data validation
- **Helmet** - Security middleware
- **Morgan** - Request logging
- **node-cron** - Scheduled tasks

## 🏗️ Project Structure

```
src/
├── app.ts                 # Express app configuration
├── server.ts               # Server entry point
├── config/
│   └── db.ts           # Database connection
├── controllers/
│   └── milkingSession.controller.ts
├── services/
│   └── milkingSession.service.ts
├── models/
│   └── milkingSession.ts
├── routes/
│   └── session.routes.ts
├── validation/
│   └── session.validation.ts
├── utils/
│   ├── apiResponse.ts
│   ├── errorUtils.ts
│   └── logger.ts
├── jobs/
│   └── sessionCleanup.job.ts
└── types/
    └── index.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm

### Installation
```bash
git clone https://github.com/Sahill31/milking_app_backend.git
cd milking_app_backend
npm install
```

### Environment Setup
Create a `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
```

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## 📋 Session Lifecycle

1. **Create Session**: Start a new milking session
   - Only requires `start_time`
   - Status set to "active"

2. **End Session**: Complete a milking session
   - Requires `milk_quantity`
   - Optional `notes`
   - Backend sets `end_time` and `duration`
   - Status changes to "completed"

3. **Automatic Cleanup**: Sessions older than 24 hours
   - Cron job runs hourly
   - Status changes to "abandoned"
   - Data preserved for analytics

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `FRONTEND_URL` - Frontend URL for CORS

### Cron Job Settings
- **Schedule**: Every hour (`0 * * * *`)
- **Cleanup**: Sessions older than 24 hours
- **Action**: Mark as "abandoned"

## 🛡️ Error Handling

All API responses follow consistent format:

**Success Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## 📝 Notes

- **Architecture**: Routes → Controllers → Services → Models
- **Validation**: Zod schemas only, no complex refinements
- **Security**: Helmet middleware enabled
- **Logging**: Morgan + custom logger
- **Database**: MongoDB with Mongoose
- **TypeScript**: Strict type safety
- **Production Ready**: Clean, interview-friendly code

## 📄 License

ISC
