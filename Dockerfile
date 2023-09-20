# Use the official node image to build the React app
FROM node:18.13.0 AS build

# Set the working directory
WORKDIR /usr/src/client

# Copy package files and install dependencies
COPY client/package*.json ./
RUN npm install

# Copy the rest of the client application files
COPY client .

# Build the React application
RUN npm run build

# Use the official Python image for the FastAPI server
FROM python:3.10.9

# Set the working directory for the server
WORKDIR /usr/src/app

# Copy requirements and install dependencies
COPY server/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the server application files
COPY server .

# Copy the built static files from the client build
COPY --from=build /usr/src/client/build /usr/src/app/build

# Use uvicorn to run your FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
