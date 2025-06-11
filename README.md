# Bizaway Trip Management Backend

## Overview

This project is a NestJS backend for trip search and management, featuring a user-friendly UI, trip search, save/delete functionality, and integration with MongoDB. It is designed for extensibility, with a clear structure for adding features like authentication and advanced search.

---

## Project Setup


### 1. Install dependencies
```bash
pnpm install
```

### 2. Start the database (MongoDB)

You can use Docker Compose for a local MongoDB instance:

```bash
docker-compose up -d
```

This will start MongoDB on the default port (27017). The `mongo-init/migration.js` script can be used for initial setup if needed.

---

## Running the Project

### Development
```bash
pnpm run start:dev
```

### Production
```bash
pnpm run start:prod
```

### Run Tests
```bash
# Unit tests
pnpm run test

# End-to-end tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGO_URI=mongodb://localhost:27017/bizaway
EXTERNAL_API_DOMAIN=your-trip-api-domain
EXTERNAL_API_KEY=your-api-key
```

---

## API Endpoints (Trip Controller)

| Method | Endpoint           | Description                                                      |
|--------|--------------------|------------------------------------------------------------------|
| GET    | `/trips`           | Search for trips (query params: origin, destination, sort_by)    |
| GET    | `/trips/list`      | List all saved trips (JSON)                                      |
| POST   | `/trips/save`      | Save a new trip (JSON body)                                      |
| DELETE | `/trips/:id`       | Delete a saved trip by ID                                        |


---

## Main Features

- **Trip Search**: Search for trips by origin, destination, and sort by fastest/cheapest.
- **Save Trips**: Save trips to your personal list with instant feedback and no page reloads.
- **Delete Trips**: Remove saved trips with a single click and instant UI update.
- **Modern UI**: Responsive, user-friendly interface with toasts and consistent navigation.
- **Backend Validation**: Robust error handling and validation for all endpoints.
- **Testing**: Comprehensive unit and e2e test coverage.

---

## Future Improvements

### Authentication
- JWT-based authentication for user login and protected endpoints.
- Role-based access control for admin/user features.

### Other Extensible Features
- Elasticsearch caching for trip search results.
- Rate limiting.
- User profile and preferences management.
- Trip history and analytics.

