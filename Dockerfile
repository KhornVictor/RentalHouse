# Use lightweight Node image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package.json ./
RUN npm install

# Copy app source and build
COPY . .
RUN npm run build

# Expose API port
EXPOSE 3000

# Start the API
CMD ["npm", "run", "start:prod"]