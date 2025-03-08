

# Issue Tracker API

## Description
Issue Tracker API is a RESTful API designed to manage and track issues efficiently. The API provides authentication, role system, task management, notifications via WebSockets, filtering, and search functionalities.

## Features
- User authentication and authorization (JWT-based)
- Issue and comments management (CRUD operations)
- WebSocket-based notifications
- Role-based access control
- Search and filtering

## Technologies Used
- **NestJS** - Backend framework
- **MongoDB** - Database
- **Prisma** - ORM
- **Redis** - Caching
- **JWT** - Authentication
- **WebSocket**  - Real-time updates
- **nestjs-pino** - Logging
- **nestjs/config** - Configuration management

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/lalkaxz/issue-tracker-api.git
   cd issue-tracker-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure environment variables:
   ```env
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ALLOWED_ORIGIN=*

   HOST=0.0.0.0
   PORT=3000
   PREFIX=/api

   MONGO_USER=username
   MONGO_PASSWORD=password
   MONGO_HOST=cluster.mongodb.net
   MONGO_DATABASE=database_name
   MONGO_URI=mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}

   LOG_FILE_PATH=./logs/app.log

   THROTTLE_TTL=60
   THROTTLE_LIMIT=10

   REDIS_TTL=60
   REDIS_NAMESPACE=myapp
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_URI=redis://${REDIS_HOST}:${REDIS_PORT}
   ```

## Running the Application

### Development Mode
```sh
npm run start:dev
```

### Production Mode
```sh
npm run build
npm run start:prod
```

### Docker
To run the application using Docker:
```sh
docker-compose up --build
```

## API Documentation
This API uses JWT authentication.

### OpenAPI Documentation
Once the application is running, API documentation is available at:
```
http://localhost:3000/api/docs
```

### Authentication
The API requires a Bearer token for authentication.
```
Authorization: Bearer <your_token>
```

## Contributing
Contributions are welcome! Please follow the standard guidelines for pull requests and issues.

## License
This project is open-source and available under the MIT License.
