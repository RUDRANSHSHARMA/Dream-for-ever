#!/bin/bash

# Portfolio Setup Script
# This script helps you set up the development environment

echo "🎨 Portfolio Website Setup"
echo "=========================="
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check for MongoDB
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed!"
    echo "Please install MongoDB:"
    echo "  - macOS: brew install mongodb-community"
    echo "  - Linux: https://docs.mongodb.com/manual/installation/"
    echo ""
fi

echo ""
echo "📦 Installing Dependencies..."
echo ""

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo ""
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Create .env files if they don't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend/.env from example..."
    cp backend/.env.example backend/.env
    echo "⚠️  Please update backend/.env with your settings!"
fi

if [ ! -f "frontend/.env" ]; then
    echo "📝 Creating frontend/.env..."
    echo "REACT_APP_API_URL=http://localhost:5000/api" > frontend/.env
fi

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "Next Steps:"
echo "1. Start MongoDB (if not running):"
echo "   - macOS: brew services start mongodb-community"
echo "   - Linux: sudo systemctl start mongod"
echo ""
echo "2. Update backend/.env with your settings (optional)"
echo ""
echo "3. Start development servers:"
echo "   ./start-dev.sh"
echo ""
echo "   Or manually:"
echo "   - Backend: cd backend && npm start"
echo "   - Frontend: cd frontend && npm start"
echo ""
echo "4. Access the website:"
echo "   - Frontend: http://localhost:3000"
echo "   - Admin: http://localhost:3000/admin/login"
echo ""
echo "Admin Credentials:"
echo "  Email: rudransh.sharma.292006@gmail.com"
echo "  Password: admin123"
echo ""
echo "📚 For more information, see README.md"
echo ""
