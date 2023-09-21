# Use an official Node.js runtime as the base image
FROM node:18.13.0

# Set the working directory in the container
WORKDIR /usr/src/app

# # Copy package.json and package-lock.json to the container
# COPY package*.json ./

# # Install project dependencies
# RUN npm install

# # Copy all project files to the container
# COPY . .

# Expose a port that the application will listen on
EXPOSE 3000

# Define the command to run your application
CMD ["node", "index.js"]
