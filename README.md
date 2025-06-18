# centivo-ass
# Node.js API with MongoDB

## Overview

This project is a Node.js Express API that connects to a MongoDB database to retrieve user data. The API provides a single endpoint to fetch user details based on a user ID, with additional logic to only return users who are older than 21 years.

## Approach

The project is structured to promote scalability and maintainability, with a clear separation of concerns. The codebase is organized into directories for configuration, models, controllers, routes, middlewares, and utilities. The API uses Mongoose for MongoDB interactions and includes error handling for invalid ObjectId and not found cases. Environment variables are used to manage configuration settings, ensuring flexibility across different environments.