# Use the official Node.js image.
FROM node:20-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the app.
RUN npm run build

# Expose the port the app runs on.
EXPOSE 3000

# Start the application.
CMD ["npm","run", "start"]
