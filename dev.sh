#!/bin/bash

# Kill any existing processes on ports 3000 and 3001
echo "Cleaning up existing processes..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:3001 | xargs kill -9 2>/dev/null

# Start backend
echo "Starting Chi Voyage Backend..."
cd backend
npm run dev &
BACKEND_PID=$!

# Start frontend
echo "Starting Chi Voyage Frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Function to handle cleanup on script exit
cleanup() {
    echo "Shutting down Chi Voyage services..."
    kill $BACKEND_PID
    kill $FRONTEND_PID
    exit 0
}

# Set up trap to catch script termination
trap cleanup SIGINT SIGTERM

# Keep script running
echo "Chi Voyage services are running!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:3001"
echo "Press Ctrl+C to stop all services"
wait 