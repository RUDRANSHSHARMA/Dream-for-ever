#!/bin/bash

# Portfolio Development Startup Script
# This script starts both frontend and backend in development mode

echo "🚀 Starting Portfolio Development Environment..."
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running!"
    echo "Please start MongoDB first:"
    echo "  - On macOS: brew services start mongodb-community"
    echo "  - On Linux: sudo systemctl start mongod"
    echo "  - Or run: mongod"
    echo ""
    exit 1
fi

echo "✅ MongoDB is running"
echo ""

# Start Backend
echo "📦 Starting Backend Server..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start Frontend
echo "🎨 Starting Frontend Server..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Development servers started!"
echo ""
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend:  http://localhost:5000"
echo "📍 Admin:    http://localhost:3000/admin/login"
echo ""
echo "Admin Credentials:"
echo "  Email: rudransh.sharma.292006@gmail.com"
echo "  Password: admin123"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user to stop
wait $BACKEND_PID $FRONTEND_PID
