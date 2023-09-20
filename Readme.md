# Curameditech Project

This project combines a React.js-based client with a Python-based server utilizing FastAPI.

## Project Structure

```
curameditech
├── client # React.js based client (Not tracked by Git)
├── server # Python based server using FastAPI
├── Dockerfile # Docker configuration for containerization
```

## Description

The `client` directory contains the frontend of the application, built with React.js. 

The `server` directory houses the backend of the application, developed using Python with FastAPI.

## Getting Started

### Prerequisites

- Node.js and npm for client development.
- Python for server development.

### Installation

1. **Client (React.js)**:
   - Navigate to the `client` directory.
   - Install dependencies:
     ```
     npm install
     ```

2. **Server (FastAPI)**:
   - Navigate to the `server` directory.
   - Install dependencies:
     ```
     pip install -r requirements.txt
     ```

## Building and Running

### Docker

To containerize the application, a Dockerfile has been provided. Use the following command to build the Docker image:

```bash
docker build -t curameditech .
```

To run the Docker container and map it to port 80:

```
docker run -p 80:80 curameditech
```
