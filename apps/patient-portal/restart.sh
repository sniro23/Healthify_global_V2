#!/bin/bash

# Restart script for Healthify Patient Portal
echo "--- Healthify Patient Portal Restart Script ---"

# Navigate to the app directory
cd "$(dirname "$0")" || exit 1
echo "Working in: $(pwd)"

# Clear Next.js cache
echo "Cleaning Next.js cache..."
rm -rf .next

# Clear any running processes on port 3000
echo "Checking for processes on port 3000..."
if command -v lsof >/dev/null 2>&1; then
  PORT_PID=$(lsof -t -i:3000 2>/dev/null)
  if [ -n "$PORT_PID" ]; then
    echo "Found process using port 3000: $PORT_PID"
    echo "Stopping process..."
    kill -9 "$PORT_PID" 2>/dev/null
    echo "Process stopped."
  else
    echo "No processes found using port 3000."
  fi
else
  echo "lsof utility not found, skipping port check."
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the development server
echo "Starting development server..."
npm run dev

echo "Done!" 