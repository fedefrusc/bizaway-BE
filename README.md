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

This will start MongoDB on the default port (27017). The `mongo-init/migration.js` script is used for initial setup.

---
## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGO_URI=mongodb://localhost:27017/bizaway
EXTERNAL_API_DOMAIN=your-trip-api-domain
EXTERNAL_API_KEY=your-api-key
```

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



## User Interface (UI) Overview

Simple but effective UI build with copilot 😁 with the following main views:

- **Home / Search Page** (`/`)
  - Allows users to search for trips by selecting origin, destination, and sort order (fastest/cheapest).
  - Features a clean, centered form and a consistent header for navigation.
  - Results are displayed on a separate page after submitting the form.

- **Search Results Page** (`/search`)
  - Displays a table of available trips matching the search criteria.
  - Each trip has a "Save" button (disabled if already saved) for quick addition to your saved list.
  - Success and error feedback is shown via modern toast notifications.

- **Saved Trips Page** (`/saved-trips`)
  - Shows all trips the user has saved, presented in a responsive card/grid layout.
  - Each card includes trip details and a "Delete" button for instant removal (with feedback toasts).
  - The layout adapts for mobile and desktop, ensuring usability on all devices.

All pages share a consistent header for easy navigation between search and saved trips. The UI is designed for clarity, speed, and a seamless user experience.

## API Endpoints (Trip Controller)

| Method | Endpoint           | Description                                                      |
|--------|--------------------|------------------------------------------------------------------|
| GET    | `/trips`           | Search for trips (query params: origin, destination, sort_by)    |
| GET    | `/trips/list`      | List all saved trips (JSON)                                      |
| POST   | `/trips/save`      | Save a new trip (JSON body)                                      |
| DELETE | `/trips/:id`       | Delete a saved trip by ID                                        |


---

## API Documentation (Swagger)

After starting the server, you can access the interactive API documentation powered by Swagger UI at:

```
http://localhost:3000/api
```

This documentation provides detailed information about all endpoints, request/response schemas, and allows you to try out the API directly from your browser.

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
- Rate limiting and throttling for API endpoints.
- Lock mechanism for trip saving to prevent duplicates.
---


