# Use official Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock first (to optimize caching)
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of your application files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the Next.js app in development mode
CMD ["yarn", "dev"]
