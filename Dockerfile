# Use official Node.js LTS lightweight image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Start server
CMD ["node", "server.js"]
