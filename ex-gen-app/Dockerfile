# Use a lightweight Node.js runtime image
FROM node:18-alpine

# Set work directory inside the container
WORKDIR /usr/src/app

# Install only production dependencies
COPY package*.json ./
RUN apk add --no-cache python3 make g++
RUN npm install --production

# Copy the application source
COPY . .

# Set environment variables expected by the app
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port used by the Express app
EXPOSE 3000

# Launch the Express server
CMD ["npm", "start"]
